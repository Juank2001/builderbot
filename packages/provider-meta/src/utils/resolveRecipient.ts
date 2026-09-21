/**
 * Meta changed the WhatsApp API so that users who enable a username no longer
 * expose their phone number. In those cases the webhook sends an opaque `user_id`
 * instead of a `wa_id` (phone number), and outbound messages must use the
 * `recipient` field instead of the `to` field.
 *
 * Reference:
 *   - Phone number (wa_id): pure digits, 10–15 chars after stripping `+`/spaces
 *   - user_id: opaque string that does NOT match the phone pattern
 */

/** Returns true when `value` looks like a Meta user_id (not a phone number). */
export function isMetaUserId(value: string): boolean {
    if (!value) return false
    const stripped = value.replace(/[+\s]/g, '')
    return !/^\d{10,15}$/.test(stripped)
}

/**
 * Returns the correct payload fields for the recipient.
 * - Phone number users → `{ to: value }` (existing behaviour)
 * - Username / user_id users → `{ recipient: value }` (new behaviour)
 */
export function resolveRecipient(value: string): { to: string; recipient?: never } | { recipient: string; to?: never } {
    if (isMetaUserId(value)) return { recipient: value }
    return { to: value }
}
