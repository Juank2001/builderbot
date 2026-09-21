import { EVENTS } from '@builderbot/bot'

import { getMediaUrl } from './mediaUrl'
import type { Message, ParamsIncomingMessage as ParamsIncomingMessage } from '../types'

export const processIncomingMessage = async ({
    messageId,
    messageTimestamp,
    pushName,
    message,
    to,
    jwtToken,
    version,
    numberId,
    fileData,
}: ParamsIncomingMessage): Promise<Message> => {
    const responseObj: Message = {
        type: message.type,
        from: message.from_user_id,
        to,
        body: '',
        name: pushName,
        pushName,
    }

    switch (message.type) {
        case 'text': {
            responseObj.body = message.text?.body
            break
        }
        case 'interactive': {
            responseObj.body =
                message.interactive?.button_reply?.title ??
                message.interactive?.list_reply?.id ??
                message.interactive?.nfm_reply.response_json
            responseObj.title_button_reply = message.interactive?.button_reply?.title
            responseObj.title_list_reply = message.interactive?.list_reply?.title
            responseObj.nfm_reply = message.interactive?.nfm_reply?.response_json
                ? JSON.parse(message.interactive?.nfm_reply?.response_json)
                : undefined
            break
        }
        case 'button': {
            responseObj.body = message.button?.text
            responseObj.payload = message.button?.payload
            responseObj.title_button_reply = message.button?.payload
            break
        }
        case 'image': {
            const imageUrl = await getMediaUrl(version, message.image?.id, numberId, jwtToken)
            responseObj.url = imageUrl ?? fileData?.url
            responseObj.fileData = fileData
            responseObj.caption = message?.image?.caption
            responseObj.body = EVENTS.MEDIA
            break
        }
        case 'document': {
            const documentUrl = await getMediaUrl(version, message.document?.id, numberId, jwtToken)
            responseObj.url = documentUrl ?? fileData?.url
            responseObj.fileData = fileData
            responseObj.body = EVENTS.DOCUMENT
            break
        }
        case 'video': {
            const videoUrl = await getMediaUrl(version, message.video?.id, numberId, jwtToken)
            responseObj.url = videoUrl ?? fileData?.url
            responseObj.fileData = fileData
            responseObj.caption = message?.video?.caption
            responseObj.body = EVENTS.MEDIA
            break
        }
        case 'location': {
            responseObj.latitude = message.location.latitude
            responseObj.longitude = message.location.longitude
            responseObj.body = EVENTS.LOCATION
            break
        }
        case 'audio': {
            const audioUrl = await getMediaUrl(version, message.audio?.id, numberId, jwtToken)
            responseObj.url = audioUrl ?? fileData?.url
            responseObj.fileData = fileData
            responseObj.body = EVENTS.VOICE_NOTE
            break
        }
        case 'sticker': {
            responseObj.id = message.sticker.id
            responseObj.body = EVENTS.MEDIA
            break
        }
        case 'contacts': {
            responseObj.contacts = [
                {
                    name: message.contacts[0].name,
                    phones: message.contacts[0].phones,
                },
            ] as any
            responseObj.body = EVENTS.CONTACTS
            break
        }
        case 'order': {
            responseObj.order = {
                catalog_id: message.order.catalog_id,
                product_items: message.order.product_items,
            }
            responseObj.body = EVENTS.ORDER
            break
        }
        default:
            // Lógica para manejar tipos de mensajes no reconocidos
            break
    }
    return {
        ...responseObj,
        message_id: messageId,
        timestamp: messageTimestamp,
    }
}
