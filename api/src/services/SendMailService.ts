import nodemailer, { Transporter } from 'nodemailer'

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
        const message = await this.client.sendMail({ to, subject, html: body, from: 'NPS <noreplay@nps.com.br>' })
        console.log('Message sent: ' + message.messageId)
        console.log('Preview URL ' + nodemailer.getTestMessageUrl(message))
    }
}

export default new SendMailService()