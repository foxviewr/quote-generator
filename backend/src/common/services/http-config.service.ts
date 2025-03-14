import { Injectable } from '@nestjs/common'
import { Agent } from 'https'
import axios from 'axios'

@Injectable()
export class HttpConfigService {
    static createAxiosInstance() {
        return axios.create({
            httpsAgent: new Agent({
                rejectUnauthorized: process.env.NODE_ENV === 'production',
            }),
            timeout: 5000,
        })
    }
}
