import nodemailer, { Transporter } from 'nodemailer'
import { resolve } from 'path'
import handlebars from 'handlebars'
import fs from 'fs'

class SendMailService {
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

    async execute(to: string, subject: string, body: string) {
        const templatePath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs')
        const templateFile = fs.readFileSync(templatePath).toString('utf-8')

        const templateParse = handlebars.compile(templateFile)
        const html = templateParse({ name: to, title: subject, description: body })

        const message = await this.client.sendMail({ to, subject, html, from: 'NPS <noreplay@nps.com.br>' })
        console.log('Message sent: ' + message.messageId)
        console.log('Preview URL ' + nodemailer.getTestMessageUrl(message))
    }
}

export default new SendMailService()