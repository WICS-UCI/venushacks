# VenusHacks Site API

This "app" contains the source code for the backend API used by the site.

## Local Development

For local development, run

```shell
python src/dev.py
```

which will start a Uvicorn server with auto-reload.

## Deployment Configuration

For deployment, the following environment variables need to be set:

- `PYTHONPATH=src/api` to properly import Python modules
- `SP_KEY`, the private key for SAML authentication
- `JWT_KEY`, the secret key used to sign JWTs
- `AUTH_KEY_SALT`, the salt used when encrypting guest authentication tokens
- `SENDGRID_API_KEY`, the API key needed to use the SendGrid API
- `HACKER_RESUMES_FOLDER_ID`, the ID of the Google Drive folder to upload hacker resumes to
- `MENTOR_RESUMES_FOLDER_ID`, the ID of the Google Drive folder to upload mentor resumes to
- Either `SERVICE_ACCOUNT_FILE` or `GOOGLE_SERVICE_ACCOUNT_CREDENTIALS`: We use a Google service acccount in tandem with aiogoogle to automatically upload resumes when submitting a form. The keys are JSON that can either be stored in a file, in which case the path of the file should be stored in `SERVICE_ACCOUNT_FILE`, or be stored directly in `GOOGLE_SERVICE_ACCOUNT_CREDENTIALS`. For local development, it is recommended to take the `SERVICE_ACCOUNT_FILE` approach.
- `DOCUSIGN_HMAC_KEY`, the HMAC key for validating DocuSign Connect webhook event payloads.

For staging, the following environment variables should also bet set:

- `DEPLOYMENT=staging`

For local, the following environment variables should also be set:

- `DEPLOYMENT=local`
