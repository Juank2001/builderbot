import type { GlobalVendorArgs } from '@builderbot/bot/dist/types'

export interface MediaResponse {
    url?: string
}
export interface Contact {
    name: string
    phones: string[]
}

export interface MetaList {
    header: {
        type: string
        text: string
    }
    body: {
        text: string
    }
    footer: {
        text: string
    }
    action: {
        button: string
        sections: {
            title: string
            rows: {
                id: string
                title: string
                description: string
            }[]
        }[]
    }
}

export type MetaGlobalVendorArgs = {
    jwtToken: string
    numberId: string
    verifyToken: string
    version: string
} & GlobalVendorArgs

export interface Order {
    catalog_id: string
    product_items: string[]
}

export interface Message {
    message_id: string
    timestamp: any
    type: string
    from: string
    to: string
    body: string
    pushName: string
    name: string
    url?: string
    payload?: string
    title_button_reply?: string
    title_list_reply?: string
    latitude?: number
    longitude?: number
    contacts?: Contact[]
    order?: Order
    id?: string
}

export interface ParamsIncomingMessage {
    messageId?: string
    messageTimestamp?: any
    pushName: string
    to: string
    jwtToken: string
    numberId: string
    version: string
    message: any
}

export type TextGenericParams = {
    messaging_product: 'whatsapp'
    recipient_type: string
    to: string
    type: string
    [key: string]: any
}

export type ParsedContact = {
    name: {
        formatted_name: string
        first_name: string
        [key: string]: any
    }
    phones: {
        phone: string
        type: string
        [key: string]: any
    }[]
    [key: string]: any
}

export interface TextMessageBody {
    messaging_product: string
    to: string
    type: string
    recipient_type?: string
    text?: {
        preview_url: boolean
        body: string
    }
    image?: {
        id: string
        caption: string
    }
    video?: {
        id: string
        caption: string
    }
    interactive?: any
    contacts?: any[]
    template?: TemplateMessage
}

interface TemplateMessage {
    template: {
        name: string
        language: {
            code: string
        }
        components: TemplateComponent[]
    }
}

interface TemplateComponent {
    type: 'header' | 'body' | 'button'
    parameters: TemplateParameter[]
}

interface TemplateParameter {
    type: string
}

export interface Reaction {
    message_id: string
    emoji: string
}
export interface Localization {
    long_number: string
    lat_number: string
    name: string
    address: string
}

export interface SaveFileOptions {
    path?: string
}

export interface WhatsAppProfile {
    verified_name: string
    code_verification_status: string
    display_phone_number: string
    quality_rating: string
    platform_type: string
    throughput: {
        level: string
    }
    id: string
}

export interface incomingMessage {
    object: string
    entry: Entry[]
}

export interface Entry {
    id: string
    changes: Change[]
}

export interface Change {
    value: Value
    field: string
}

export interface Value {
    messaging_product: string
    metadata: Metadata
    contacts: Contact[]
    messages: Message[]
}

export interface Metadata {
    display_phone_number: string
    phone_number_id: string
}

export interface Contact {
    profile: Profile
    wa_id: string
}

export interface Profile {
    name: string
}

export interface Message {
    from: string
    id: string
    timestamp: string
    text: Text
    type: string
}

export interface Text {
    body: string
}
