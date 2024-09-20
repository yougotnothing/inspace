# INSPACE

### <a href="#en_idea">Project idea</a> <a href="#stack">Tech stack</a> <a href="/api/README.md">Backend</a> <a href="#frontend">Frontend</a> <a href="#fastapi">Python backend</a>

---

<br id="stack">

[![My Skills](https://skillicons.dev/icons?i=nestjs,postgres,prisma,typescript,docker,webpack,yarn,python,fastapi,html,css,react,vite,styledcomponents)](https://skillicons.dev)

### **_<a href="#en_idea">en</a> <a href="#ru_idea">ru</a>_**

## <h2 id="en_idea">en:</h2>

### The idea of the project is to create an application that will show all sorts of space events (moon phase, lunar, solar eclipse, and meteor showers). in order to improve the use of the application for their own purposes (namely tracking these events in real life) it is planned to add functionality to display light and air pollution. it is planned to integrate technology to send messages to the mail to the user a hundred percent was notified in a new event outside of our planet, also planned to add functionality within this application, let's call it “to spot”. with its help the user can mark events that he saw. in the future it is planned to create a mobile application and telegram bot, at the present time the development of web application will be started.

---

<br id="ru_idea">

## ru:

### идея проекта заключается в создании приложения которое будет показывать всякие космические ивенты (фаза луны, лунное, солнечное затмение, и метеоритные дожди). дабы улучшить экспириенс использования приложения в своих целях (а именно отслеживания этих событий в реальной жизни) планируется добавить функционал отображения светового и воздушного загрязнения. планируется интегрировать технологии отправки сообщений на почту чтобы пользователь сто процентно был уведомлен в новом событии за пределами нашей планеты, также планируется добавление функционала заметок внутри этого приложения, назовем это “to spot”. с его помощью пользователь может отмечать ивенты которые он увидел. в будущем планируется создать мобильное приложение и telegram бота, в нынешнее время будет начата разработка веб приложения.

---

<br id="run_app">

## Run app

#### create a `.env` file in root directory

```.env
#for geo service python
USER_AGENT=... #your user agent key (may be any string)
DEEPL_API_KEY=... #your deepl api key

#for postgres environment
POSTGRES_DB=inspace-storage #your postgres database name (default is 'inspace-storage')
POSTGRES_USER=... #your postgres username
POSTGRES_HOST=localhost #your postgres host (default is 'localhost')
POSTGRES_PORT=5432 #your postgres port (defualt is '5432')
POSTGRES_PASSWORD=... #your postgres password

#for hmr
CHOKIDAR_USEPOLLING=true

#for hmr on frontend
VITE_HMR_PORT=5173
VITE_HMR_HOST=localhost

GEO_URL=... #your FastAPI app url (don't use an 'localhost' host in url, you must replace it with docker container name. Default is 'geo', it must looks like 'http://geo:8000')
```
