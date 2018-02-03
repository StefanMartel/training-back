export const MongoDBB = {
    'server': 'mongodb://127.0.0.1',
    'port':  27017,
    'dbb': 'vic',
    'userColl': 'usners'
}

export const UserInputFields = {
    'login' : 'login',
    'password' : 'password'
}

export const OptionsCors ={
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "http://localhost:4200",
    preflightContinue: false
}