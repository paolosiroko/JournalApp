# React Native & Django Journal app

This project is a simple example of the Journal app.
It consists of a frontend React Native application and a Django powered backend auth API enabled by the Rest Framework. 



## Installation

Clone this directory:

```bash
git clone https://github.com/paolosiroko/JournalApp.git
cd JournalApp
```

There are to subdirectories that contain the React Native frontend and the Djanjo + Rest Framework backend.

### Backend API installation

Navigate to the **backend** directory, create a virtualenv and install the project requirements.

```bash
cd backend

# Create a virtualenv
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

As this is a Django project, it is recommended that you run the initial migrations and create a supersuer to get started.

```bash
python manage.py migrate
python manage.py createsuperuser
```

### React Native app installation

go to utils/utils.js and update your base url with you system ip address

Navigate to the **frontend** directory and install the required node pacakges:

```bash
npm install
```

Once the installation is over, you will also need to grab your phone and download the Expo app (this is the simplest solution) from the Play store or App store.

Optionally, you can create a virtual device on your computer.

## Usage

To get started with a working version of the project you must have completed the above steps or ensured that all the setup is ready.

Open a terminal window and navigate to the **JournalApp/backend** directory, start a local dev server with you local IP as parameter:

```bash
python manage.py runserver <YOUR_LOCAL_IP>:8000
```

Once this is properly configured, on the *frontend* project root start a dev server:

```bash
npm start
```
The application should start and you can login with your superuser credentials or create a new user.


