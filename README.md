# Homepage deployment

This project is a Vite/React single-page app. The simplest AWS setup is:

1. Build the frontend into static files.
2. Store those files in a private S3 bucket.
3. Serve the bucket through CloudFront.
4. Point your domain to CloudFront with Route 53 or your registrar.

## Files

- [template.yaml](template.yaml) creates the S3 bucket, CloudFront distribution, and optional Route 53 aliases.
- [scripts/deploy.sh](scripts/deploy.sh) builds the app, deploys the stack, syncs the build output, and creates a CloudFront invalidation.

## Prerequisites

- AWS CLI configured with credentials that can deploy CloudFormation, S3, CloudFront, and Route 53 resources.
- Node.js and npm installed.
- Run `npm install` in `frontend/` once before the first deploy.
- An ACM certificate in `us-east-1` if you want to use a custom domain.

## Deploy

### Manual deployment

For the default CloudFront domain:

```bash
bash scripts/deploy.sh
```

For a custom domain:

```bash
DOMAIN_NAME=example.com \
HOSTED_ZONE_ID=Z1234567890ABCDE \
ACM_CERTIFICATE_ARN=arn:aws:acm:us-east-1:123456789012:certificate/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx \
bash scripts/deploy.sh
```

### Automatic deployment with GitHub Actions

Pushing to `main` or `develop` branches automatically builds and deploys to AWS.

#### Setup

1. Create an IAM role in AWS with permissions for CloudFormation, S3, and CloudFront. Use OIDC for GitHub Actions (recommended).

2. Add the following secrets to your GitHub repository settings:
   - `AWS_ROLE_ARN`: The ARN of the IAM role created in step 1.
   - `DOMAIN_NAME` (optional): Your custom domain name.
   - `HOSTED_ZONE_ID` (optional): Your Route 53 hosted zone ID.
   - `ACM_CERTIFICATE_ARN` (optional): Your ACM certificate ARN in us-east-1.

3. Commit and push your changes to GitHub. The workflow in [.github/workflows/deploy.yml](.github/workflows/deploy.yml) will run automatically.

## What the script does

The script runs `npm run build` in `frontend/`, deploys [template.yaml](template.yaml), reads the bucket and distribution IDs from the stack outputs, uploads `frontend/dist/` to S3, and invalidates the CloudFront cache.

## Notes

If you use React Router with direct links like `/dashboard`, CloudFront must return `index.html` for 403 and 404 responses. That is already configured in [template.yaml](template.yaml).

## GitHub Actions workflow

The workflow in [.github/workflows/deploy.yml](.github/workflows/deploy.yml):
- Runs on push to `main` and `develop`.
- Installs Node.js, builds the frontend.
- Deploys the CloudFormation stack.
- Syncs the build output to S3.
- Invalidates CloudFront cache.
- Skips deployment for pull requests.

### Setting up AWS OIDC for GitHub Actions

Instead of storing long-lived AWS credentials, use OpenID Connect (OIDC):

1. Create an IAM role with trust relationship for GitHub Actions:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": {
           "Federated": "arn:aws:iam::ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
         },
         "Action": "sts:AssumeRoleWithWebIdentity",
         "Condition": {
           "StringEquals": {
             "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
             "token.actions.githubusercontent.com:sub": "repo:USERNAME/REPO_NAME:ref:refs/heads/main"
           }
         }
       }
     ]
   }
   ```

2. Attach policies to the role:
   - `AmazonS3FullAccess`
   - `CloudFrontFullAccess`
   - `IAMFullAccess` (for CloudFormation to create roles; you can be more restrictive)

3. Add the role ARN to GitHub Secrets as `AWS_ROLE_ARN`.