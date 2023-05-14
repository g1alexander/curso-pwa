const vapid = require('./vapid.json');
const urlSafeBase64 = require('urlsafe-base64');

const fs = require('fs');

const webpush = require('web-push');

webpush.setVapidDetails(
    'mailto:edupaway@gmail.com',
    vapid.publicKey,
    vapid.privateKey
);

let subscricions = require('./subs-db.json') || [];

module.exports.getKey = () => {

    const base64 = urlSafeBase64.decode(vapid.publicKey);

    return base64;
}

module.exports.addSubscription = ( suscripcion ) => {
  
      subscricions.push( suscripcion );

      fs.writeFileSync(`${__dirname}/subs-db.json`, JSON.stringify(subscricions));
}

module.exports.sendPush = ( post ) => {

    console.log('Mandando push');

    const notificacionesEnviadas = [];

    subscricions.forEach((sub, i) => {
        const pushProm =  webpush.sendNotification( sub, JSON.stringify( post ) )
            .then( console.log('Notificación enviada') )
            .catch( err => {
                console.log('Notificación falló');
                    
                    if(err.statusCode === 410) { // GONE, ya no existe
                        subscricions[i].borrar = true;
                    }
            })

        notificacionesEnviadas.push( pushProm );
    })

    Promise.all( notificacionesEnviadas ).then( () => {
        subscricions =  subscricions.filter( subs => !subs.borrar );

        fs.writeFileSync(`${__dirname}/subs-db.json`, JSON.stringify(subscricions));
    })

}