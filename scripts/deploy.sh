#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FRONTEND_DIR="$ROOT_DIR/frontend"
STACK_NAME="${STACK_NAME:-homepage-static}"
AWS_REGION="${AWS_REGION:-eu-central-1}"
DOMAIN_NAME="${DOMAIN_NAME:-}"
HOSTED_ZONE_ID="${HOSTED_ZONE_ID:-}"
ACM_CERTIFICATE_ARN="${ACM_CERTIFICATE_ARN:-}"

# CloudFormation stack names may only contain letters, numbers, and hyphens.
NORMALIZED_STACK_NAME="$(echo "$STACK_NAME" | tr '_' '-' | sed 's/[^a-zA-Z0-9-]//g')"
if [[ -z "$NORMALIZED_STACK_NAME" ]]; then
  NORMALIZED_STACK_NAME="homepage-static"
fi
if [[ ! "$NORMALIZED_STACK_NAME" =~ ^[a-zA-Z] ]]; then
  NORMALIZED_STACK_NAME="h-$NORMALIZED_STACK_NAME"
fi
STACK_NAME="$NORMALIZED_STACK_NAME"

if ! command -v aws >/dev/null 2>&1; then
  echo "aws cli is required" >&2
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required" >&2
  exit 1
fi

wait_for_stack_not_in_progress() {
  local stack_name="$1"
  local region="$2"

  if ! aws cloudformation describe-stacks --stack-name "$stack_name" --region "$region" >/dev/null 2>&1; then
    return 0
  fi

  while true; do
    local current_status
    current_status="$(aws cloudformation describe-stacks \
      --stack-name "$stack_name" \
      --region "$region" \
      --query 'Stacks[0].StackStatus' \
      --output text)"

    if [[ "$current_status" == *_IN_PROGRESS ]]; then
      echo "CloudFormation stack operation in progress ($current_status), waiting 20s..."
      sleep 20
      continue
    fi

    echo "CloudFormation stack status is stable: $current_status"
    return 0
  done
}

cd "$FRONTEND_DIR"
npm run build

PARAMETER_OVERRIDES=()
if [[ -n "$DOMAIN_NAME" ]]; then
  PARAMETER_OVERRIDES+=("DomainName=$DOMAIN_NAME")
fi

if [[ -n "$HOSTED_ZONE_ID" ]]; then
  PARAMETER_OVERRIDES+=("HostedZoneId=$HOSTED_ZONE_ID")
fi

if [[ -n "$ACM_CERTIFICATE_ARN" ]]; then
  PARAMETER_OVERRIDES+=("AcmCertificateArn=$ACM_CERTIFICATE_ARN")
fi

DEPLOY_ARGS=(
  cloudformation deploy
  --stack-name "$STACK_NAME"
  --template-file "$ROOT_DIR/template.yaml"
  --region "$AWS_REGION"
  --capabilities CAPABILITY_NAMED_IAM
)

if [[ ${#PARAMETER_OVERRIDES[@]} -gt 0 ]]; then
  DEPLOY_ARGS+=(--parameter-overrides)
  DEPLOY_ARGS+=("${PARAMETER_OVERRIDES[@]}")
fi

wait_for_stack_not_in_progress "$STACK_NAME" "$AWS_REGION"

aws "${DEPLOY_ARGS[@]}"

BUCKET_NAME="$(aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --region "$AWS_REGION" \
  --query "Stacks[0].Outputs[?OutputKey=='FrontendBucketName'].OutputValue" \
  --output text)"

DISTRIBUTION_ID="$(aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --region "$AWS_REGION" \
  --query "Stacks[0].Outputs[?OutputKey=='FrontendDistributionId'].OutputValue" \
  --output text)"

aws s3 sync "$FRONTEND_DIR/dist" "s3://$BUCKET_NAME" --delete
aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths '/*'

echo "Deployment finished."
echo "Bucket: $BUCKET_NAME"
echo "Distribution: $DISTRIBUTION_ID"