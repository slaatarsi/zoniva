// shortcut: placeholder until the oRPC + Better Auth handlers are added.
export default {
  fetch() {
    return new Response('Not found', { status: 404 })
  },
} satisfies ExportedHandler<Env>
