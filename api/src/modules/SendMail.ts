import nodemailer, { Transporter } from 'nodemailer'
import handlebars from 'handlebars'
import fs from 'fs'

class SendMail {
    private client: Transporter

    constructor() {  // Constructor não aceita ser async
        nodemailer.createTestAccount()
            .then(account => {
                const { host, port, secure } = account.smtp
                const { user, pass } = account

                const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } })

                this.client = transporter
            })
    }

    async execute(to: string, subject: string, variables: object, path: string) {
        const template = fs.readFileSync(path).toString('utf-8')
        const parse = handlebars.compile(template)
        const html = parse(variables)

        const message = await this.client.sendMail({ to, subject, html, from: 'NPS <noreplay@nps.com.br>' })
        console.log('Message sent: ' + message.messageId)
        console.log('Preview URL ' + nodemailer.getTestMessageUrl(message))
    }
}

export default new SendMail()