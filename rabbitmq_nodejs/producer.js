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
        
//         const queue_1 = 'queue1' // queue name
//         const queue_2 = 'queue1.teste' // queue name
        
//         channel.assertQueue(queue_1, {durable: false}) // create queue
//         channel.assertQueue(queue_2, {durable: false}) // create queue

//         const message = 'Hello World!' // message to be sent
    


//         channel.sendToQueue(queue_1, Buffer.from(message), ) // send message to queue
//         channel.sendToQueue(queue_2, Buffer.from(`${message} da segunda fila`), ) // send message

//         console.log(` [x] Sent ${message}`)

//     })
//     setInterval(() => {
//         connection.close()
//         process.exit(0)

//     }, 1000)

// })

// EXEMPLO 2

connect('amqp://localhost', (err, connection) => {
    if (err) {
        console.log('Error in connecting to RabbitMQ')
        throw err
    }

    connection.createChannel((err, channel) => {
        if (err) {
            console.log('Error in creating channel')
            throw err
        }

        var queue = 'newTask'
        
        const messages = [
        "First message.",
        "Second message..",
        "Third message...",
        "Fourth message....",
        "Fifth message....."
        ] 

        channel.assertQueue(queue, {durable: true})

        messages.forEach((message, index) => {
            setTimeout(() => {
                channel.sendToQueue(queue, Buffer.from(message), {persistent: true})
                console.log(" [x] Sent '%s'", message)
            }, index * 1000)
        })
       
    })
})