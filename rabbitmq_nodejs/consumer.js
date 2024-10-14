import {connect} from 'amqplib/callback_api.js'


// EXEMPLO 1
// connect('amqp://localhost', (err, connection) => { // connect to RabbitMQ server
//     if (err) {
//         // handle error
//         console.log('Error in connecting to RabbitMQ')
//         throw err
//     }
    
//     connection.createChannel((err, channel) => {
//         if (err) {
//         // handle error
//         console.log('Error in creating channel')
//         throw err

//         }
    
//         const queue = 'queue1.teste' // queue name
        
//         channel.assertQueue(queue, {durable: false}) // create queue
//         console.log(` [*] Waiting for messages in ${queue}. To exit press CTRL+C`)
        
//         channel.consume(queue, (msg) => {
//             console.log(` [x] Received ${msg.content.toString()}`)
//         }, {noAck: true})
    
//     })
// })

// EXEMPLO 2 

connect('amqp://localhost', (err, connection) => {
    if (err){
        console.log('Erro in connecting to RabbitMQ')
        throw err
    }

    connection.createChannel((err, channel) => {
        if (err) {
            console.log('Error in creating channel')
            throw err
        }

        var queue = 'newTask'


        channel.assertQueue(queue, {durable: true})

        channel.consume(queue, function(msg) {
            var secs = msg.content.toString().split('.').length - 1
            console.log(secs)
            console.log(" [x] Received %s", msg.content.toString())
            setTimeout(function() {
              console.log(" [x] Done")
            }, secs * 1000)
          }, {
            // automatic acknowledgment mode,
            // see /docs/confirms for details
            noAck: true
          })    
})
})