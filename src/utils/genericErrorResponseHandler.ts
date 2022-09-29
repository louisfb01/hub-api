import EmailSender from "../infrastructure/EmailSender";
import version from "./version";

function errorHandler(err: any, req: any, res: any, next: any) {
    if (res.headersSent) {
        return next(err)
    }

    const hubApiVersion = version.getBuildVersion()
    const stackTrace = (err).stack
    const userEmail = (err).user.email
    const errorResult = {userEmail, hubApiVersion, stackTrace }

    EmailSender.sendEmailToErrorList(errorResult, userEmail);
    res.status(500).send(errorResult);
}

export default {
    errorHandler
}