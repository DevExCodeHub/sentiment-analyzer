# Sentiment Analysis with Watson

This project searches for the latest tweets containing an input word and returns sentiment of each tweet using Watson Natural Language Understanding service.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- IBM Cloud Account
- Node.js

### Installing


The setup is done in 3 primary steps.  You will download the code, setup the application and then deploy the code to IBM Cloud.

1. [Sign up on IBM Cloud](#1-sign-up-on-ibm-cloud)
2. [Clone the repo](#2-clone-the-repo)
3. [Twitter requirements](#3-twitter-requirements)
4. [Create Watson Natural Language Understanding service](#4-create-watson-natural-language-understanding-service)
5. [Run the application](#5-run-the-application)

### 1. Sign up on IBM Cloud

If you do not already have a IBM Cloud account, [sign up for IBM Cloud](https://ibm.biz/clouddayalfaisal).

### 2. Clone the repo

1. Under the repository name, click `Clone or download`.

    ![Clone](https://help.github.com/assets/images/help/repository/clone-repo-clone-url-button.png)

2. In the Clone with HTTPs section, click `Download ZIP`.

3. Right click on the downloaded `.zip` folder and click `Extract All`.

### 3. Twitter requirements

To get Tweets from a specific handle in this application, it is required to create a Twitter account and a Twitter application.
The Twitter account will be used as the account that gets the tweets from other Twitter users.
* You can create an account on [Twitter](https://twitter.com/signup) or use an existing account.
* Once you have the Twitter account created and verified, log in to [Twitter Dev](https://apps.twitter.com/) and create an application.  
* Select the Keys and Access Tokens tab and copy your `API Key` and `API Secret`.
* In the cloned folder, create `.env` file and paste your keys:
    ```
    consumer_key=
    consumer_secret=
    access_token=
    access_token_secret=
    ```

### 4. Create Watson Natural Language Understanding service

1. Log into [IBM Cloud](http://bluemix.net/) with your account.
2. Create `Natural Language Understanding` service.
    - From the top bar menu, click `Catalog`.
    - On the left menu, select `Watson`.
    - Select `Natural Language Understanding`.
    - Click `Create`.
3. Once the application is created, go into the application and select `Service credentials`.
4. Click `View credentials` to copy your username and password into `.env` file:

    ```
    consumer_key=
    consumer_secret=
    access_token=
    access_token_secret=
    username=
    password=
    ```

### 5. Run the application

1. Open `Terminal` in Mac or `Command Prompt` in Windows, and navigate to the cloned folder

    ```
    cd C:\Users\%username%\Downloads\sentiment-analysis-with-watson-master
    ```

2. Run the application with the following command:

    ```
    node app.js
    ```
