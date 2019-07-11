export const MongoDBB = {
    'server': 'mongodb://127.0.0.1',
    'port':  27017   
}

export const MongoDBB_training = {
    'dbb': 'training',
    'collec_training_list': 'training_list',
    'collec_users': 'training_user'
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

export const returnCode= {
    bddError: {code:100, message:'Probléme BDD'},
    inserted : { code:201, message:'OK'},
    deleted: { code:204, message:'OK'},
    badRequest :{ code:400, message:'Bad Request'}
}