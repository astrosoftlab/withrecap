# Recap

Meeting notes, on autopilot.

![image](https://github.com/jasonmz/withrecap/assets/48445639/8702262f-ac5a-493f-bb49-6aa1753fd466)

<br>

## 1. Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

1. Yarn v3 (https://yarnpkg.com)

   - This Project uses yarn workspaces (https://yarnpkg.com/features/workspaces)

2. NodeJS v18 (https://nodejs.org)

### Install local repo

```bash
git clone https://github.com/System-D-Labs/recap.git

cd recap

yarn install
```

<br>

## 2. Firebase Configuration

### Create a firebase project

1. Go to the [Firebase console](https://console.firebase.google.com) and sign in to your account.

2. Click on **Add project**.

3. Finish creating a new project for a production server.

### Setup a project configuration

1. In the project dashboard, click on **Project settings** in the top-left gear icon. Click a button whose text appears to be html tag in order to create a webapp on the section **Your apps** on the tab **General** in project settings page. Just name it `Recap-app` and enable **Also set up Firebase Hosting for this app.**, then click on **Register app**.

2. Go to **Build > Authentication** and click **Get started**, then set Google as a sign-in method, activating an option **Enable**, finally click on **Save**.

3. Go to **Build > Firestore Database** and click on **Create database**, choose **Start in production mode** and click on **Next**, choose an expected cloud firestore location and click on **Enable**.

4. Go to **Build > Realtime Database** and click on **Create database**, choose **Start in production mode** and click on **Next**, choose an expected cloud realtime database location and click on **Enable**.

5. Optional: Go to **Build > Hosting** and finish `Get started`, then click **Add custom domain** to setup your domain.

<br>

## 3. Environment Setup for Local development

Go to the repo of your local project you cloned.

In the root directlry of your local project, copy/paste `.env.example` and rename it to `.env`.

### Configure initial variables

1. Set `NODE_ENV` as `development`.

2. Set `DOMAIN` as `localhost:3000`.

3. Set `EXTENSION_LINK` as the chrome webstore link of [Recap extension](https://chrome.google.com/webstore/detail/recap/dhmpndgmdjabkhdhhlkhocompgfkdpah).

4. Set `EXTENSION_KEY` from the chrome webstore developer dashboard.

   - Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole) and select the package of the chrome extension you published.

   - Move to **Package** page and click **View public key** to see it.

   - Copy the content of the key value between `-----BEGIN PUBLIC KEY-----` and `-----END PUBLIC KEY-----`.

   - Remove all line breaks to use it as an environment variable.

   - Set `EXTENSION_KEY` with the value of key.

### Configure firebase variables

1. Go to your firebase project in [Firebase console](https://console.firebase.google.com), click on **Project settings** in the top-left gear icon.

2. Take note of all variables in `firebaseConfig` in code snippet of your app `recap-app`.

   ```javascript
   const firebaseConfig = {
     apiKey: 'xxxxx',
     authDomain: 'xxxxx',
     databaseURL: 'xxxxx',
     projectId: 'xxxxx',
     storageBucket: 'xxxxx',
     messagingSenderId: 'xxxxx',
     appId: 'xxxxx',
     measurementId: 'xxxxx'
   }
   ```

3. Replace all corresponding empty variables by upper snake case in `.env` with those values you"ve just taken note.

### Configure OAUTH2_CLIENT_ID

1. Go to the [Google Cloud Platform Console](https://console.cloud.google.com/).

2. From the projects list, select the firebase project you created in the step [Create a firebase project](#create-a-firebase-project).

3. In the sidebar on the left, click **APIs & Services**.

4. On the drop-down menu, click on **Credentials**.

5. At the top of the page, select **Create Credentials** and then from the dropdown, select **OAuth client ID**.

6. Choose the application type as `Chrome Extension`, and fill out Application type and Item ID.

7. Click the **Create** button. Your client ID is created and shown on the credentials page.

8. Copy the Client ID you are given, then put it in `OAUTH2_CLIENT_ID` in `.env`.

### Configure SENTRY_DSN

1. First, log in to your [Sentry](https://sentry.io/) account.

2. Open your Project settings. To do this:

   - Click on **Projects** in the sidebar.
   - Then click on your Project's name.

3. Navigate to **Settings > Projects > [Your project name] > Client Keys (DSN)**.

4. Now, you will see a list of your DSNs. There should be a default one already created for you.

5. Copy the DSN. It typically looks like this format: `https://<public_key>:<secret_key>@sentry.io/<project_id>`

6. Paste it in `SENTRY_DSN` in `.env`.

Finally the `.env` will look similar to below:

```
  NODE_ENV="xxxxx"
  DOMAIN="xxxxx"
  EXTENSION_LINK="xxxxx"
  EXTENSION_KEY="xxxxx"

  FIREBASE_API_KEY="xxxxx"
  FIREBASE_AUTH_DOMAIN="xxxxx"
  FIREBASE_DATABASE_URL="xxxxx"
  FIREBASE_PROJECT_ID="xxxxx"
  FIREBASE_STORAGE_BUCKET="xxxxx"
  FIREBASE_MESSAGING_SENDER_ID="xxxxx"
  FIREBASE_APP_ID="xxxxx"
  FIREBASE_MEASUREMENT_ID="xxxxx"

  OAUTH2_CLIENT_ID="xxxxx"
  SENTRY_DSN="xxxxx"
```

### Configure GCP service account key

1. Visit the [Google Cloud Console](https://console.cloud.google.com/).

2. From the projects list, select the firebase project you created in the step [Create a firebase project](#create-a-firebase-project).

3. Go to [Enabling access to Google API](https://console.cloud.google.com/apis/enableflow?apiid=iam.googleapis.com) and click **NEXT > ENABLE** to enable it.

4. Go to [Enabling access to Google Calendar API](https://console.cloud.google.com/apis/enableflow?apiid=calendar-json.googleapis.com) and click **NEXT > ENABLE** to enable it.

5. Navigate to **IAM & Admin > Service Accounts** in the left-side menu.

6. Click **Create Service Account**.

7. In the **Service account name** field, enter a name `github-actions`. The **Service account ID** field will fill in automatically with an ID that is unique within the project.

8. Optional: Add a description of the service account. Click **Create and continue**.

9. Assign roles to your service account.

   - Add the following roles: `API Keys Viewer`, `Artifact Registry Writer`, `Cloud Datastore Index Admin`, `Cloud Functions Developer`, `Cloud Run Viewer`, `Cloud RuntimeConfig Admin`, `Cloud Scheduler Admin`, `Firebase Admin`, `Firebase Authentication Admin`, `Firebase Extensions API Service Agent`, `Firebase Hosting Admin`, `Firebase Rules Admin`, `Service Account User`.

   - Click **Continue**.

10. Click **Done** to finish. You will probably redirect back to `Service Accounts` page and see the service account you created appears in the table.

11. Create a Key and download it.

    - Click the service account you've just created. ( Its name looks similar to `github-actions@recap.iam.gserviceaccount.com`. )

    - Navigate to **Keys** tab, then click **Add Key > Create new key**.

    - Choose **JSON** as the **Key type** and click **Create**.

    - A JSON key file gets downloaded onto your machine.

12. Move the JSON key file to the root directory of your local repository.

<br>

## 4. Environment Setup for CI/CD

Go to the project github repository, then navigate to **Settings** tab.

Click **Environments** on the left sidebar of **Repository settings** page, then click **New environment**.

Give it a name `PRODUCTION` and click **Configure environment** to finish, you will be redirect to the environment edit page.

### Initial configuration

1. Click **Add variable** and give `DOMAIN` to **Name**, give the domain of your firebase hosting server (ex: withrecap.com) to **Value**.

2. Click **New repository secret** and give `EXTENSION_KEY` to **Name**, copy/paste the value in `.env` into **Secret**.

### Configuration copy from `.env`

1. Create variables `EXTENSION_LINK`, `OAUTH2_CLIENT_ID`, `FIREBASE_AUTH_DOMAIN`, `FIREBASE_DATABASE_URL`, `FIREBASE_PROJECT_ID`, `FIREBASE_APP_ID`, `FIREBASE_STORAGE_BUCKET`, `FIREBASE_MESSAGING_SENDER_ID`, `FIREBASE_MEASUREMENT_ID`, copying/pasting the corresponding values in `.env` to each one.

2. Create secrets `FIREBASE_API_KEY`, `SENTRY_DSN`, copying/pasting the corresponding values of `.env` which you early configured to each one.

### Configure GCP service account key

1. Open `service-account.json` in your local project and copy its content.

2. On the environment edit page of your github repository, create a new secret `FIREBASE_SERVICE_ACCOUNT` and paste the content of JSON file into the secret value.

### Enable OAuth consent screen

1. Go to [Configuring OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent).

2. Configure **User type**.

   - Set `MAKE EXTERNAL` if it is for a production. You will need to submit and take an extensive verification process, or just set `Test` and add testers' emails in **Test users** section.

   - Set `MAKE INTERNAL` if it is for a staging.

3. Click **EDIT APP** and enter required inputs and click **SAVE AND CONTINUE** to move to the step **Scopes**.

4. Click **ADD OR REMOVE SCOPES** and select scopes whose values are `.../auth/userinfo.email`, `.../auth/userinfo.profile`, `...auth/calendar.readonly`, and click **UPDATE**, then **SAVE AND CONTINUE** to move to the step **Optional info**.

5. Just click **SAVE AND CONTINUE**.

### Configure GPT-4 API KEY

1. Visit the official site of OpenAi at [https://beta.openai.com/signup/](https://beta.openai.com/signup/)

2. Click on **'Get Started'**.

3. Fill out all the required details and create a new account.

4. Confirm your Email ID by clicking on the verification link sent to your email.

5. After confirming your email, log in to your account.

6. Navigate to the 'API Keys' section. It can usually be found under the Dashboard or Account Settings.

7. Click on **'Create New'** and then name your application and describe its purpose.

8. Copy the api key and paste it

9. On the environment edit page of your github repository, create a new secret `CHATGPT_API_KEY` and paste the API KEY into the secret value.

### Configure Mailgun API KEY

1. First, log in to your [Mailgun](https://www.mailgun.com) account.

2. Once you're logged in, go to your Dashboard by clicking on the `Dashboard` button usually located at the top right corner of the page.

3. Inside the Dashboard, find and click on `Settings` in the left side navigation bar. This should open a dropdown menu.

4. In the dropdown menu, look for and click on `API Keys`.

5. On the `API Keys` page, you will see a list of available API Keys with their names and a hidden key.

6. Find the `Private API Key` section. The API key will be hidden for security purposes, but there's an `eye` icon next to it.

7. Click on the `eye` icon to reveal your Mailgun Private API key, then copy it.

8. On the environment edit page of your github repository, create a new secret `MAILGUN_API_KEY` and paste the API KEY into the secret value.

### Configure Personal Github Token

1. Go to github settings for [personal access tokens](https://github.com/settings/tokens).

2. Click **Generate new token > Generate new token (classic)**.

3. Give it a name (ex: `RECAP_PRODUCTION_TOKEN`), set **Expiration** `No expiration`, give `repo`, `workflow`, `write:packages`, `delete:packages`, `project` to its scopes, then click **Generate token** to create a token and copy the token's value.

4. On the environment edit page of your github repository, create a new secret `PERSONAL_GITHUB_TOKEN` and paste the token into the secret value.

<br>

## 5. Deploying The App

Deployment is processed automatically by github actions. You must have already done configuring [Environment Setup for Local development](#environment-setup-for-local-development) and [Environment Setup for CI/CD](#environment-setup-for-cicd) before starting a deployment.

### Deploy only production server

Merge a PR branch or directly push commits into main in order to deploy a production server.

### Deploy production server & Release new version of extension

You must be in main branch.

1. Bump up a new version.

   ```bash
   yarn bump --version=<version>
   # EX: yarn bump --version=1.1.0
   # or  yarn bump:major
   # or  yarn bump:minor
   # or  yarn bump:patch
   ```

2. Push to github.

   ```bash
   git commit -m "<commit message>" # EX: git commit -m "chore: release v1.1.0
   git push
   ```

### Deploy staging server & Release new test version of extension

You have to configure an another firebase project and github environment named `STAGING` in order to set up a CI/CD for a staging server. Then make a PR to deploy staging server and use the `prerelease` version of test-tailord extension on **Releases** page, like `v1.1.0-test.1`.

### Apply firebase function access role.

- Go to [Enabling access to functions](https://console.cloud.google.com/functions), you will see all firebase cloud functions used in the project.

- Select all functions that have triggers specified as HTTP by clicking checkboxes on the left side of each rows.

- Click **PERMISSIONS** and side toggle pane will appear, then click **ADD PRINCIPAL**.

- Enter `allUsers` in the input box named **New principals**, then give a role `Cloud Functions Invoker` in the select box named **Select a role**.

- Click **SAVE** to finish.

<br>

🎉 Congratulations! You have successfully setup your project finally.

<br>

## 6. Running The Project Locally

Go to the root directory of the project.

### Start Emulators

```bash
yarn engine start
```

### Start App

```bash
yarn app start # with cloud server
yarn app start:emulate # with emulators
```

### Start Extension

```bash
yarn extension start # with cloud server
yarn extension start:emulate # with emulators
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Also, you will see the chrome extension is being built into `/packages/extension/dist`.

## License

This project is licensed under the MIT License.

<br>

---

Made with ❤️ by `System D Labs`. Enjoy!
