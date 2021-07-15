import { SiteClient } from 'datocms-client'


export default async function requestReceiver(req, res) {
  if(req.method === 'POST') {
    const client = new SiteClient(process.env.DATO_FULL_ACCESS_TOKEN)

    const registro = await client.items.create({
      itemType: '967833',  // ID do model de Comunidades do Dato
      ...req.body
    })

    res.json(
      registro
    )

    return
  }

  res.status(404).json({
    message: 'Ainda não temos nada no GET, mas no POST tem'
  })
}