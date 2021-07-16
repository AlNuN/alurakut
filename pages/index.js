import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { CommunityCard, ComunidadesDTO, PessoasComunidadeDTO, SeguindoDTO } from '../src/components/CommunityCard'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons' 
import { useEffect, useState } from 'react'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'

function ProfileSideBar(propriedades) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }}></img>
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home(props) {
  const [comunidades, setComunidades] = useState([])
  const githubUser = props.githubUser
  const pessoasFavoritas = [
    'JulianaAmoasei',
    'flaviohenriquealmeida',
    'juunegreiros',
    'omariosouto',
    'rafaballerini',
    'peas',
    'giggio',
  ]

  const handleCreateCommunity = (event) => {
    event.preventDefault()
    const dadosForm = new FormData(event.target)

    const comunidade = {
      title: dadosForm.get('title'),
      imageUrl: dadosForm.get('image'),
      link: dadosForm.get('link'),
      creatorSlug: githubUser,
    }

    fetch('/api/comunidades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comunidade),
    })
    .then(async (response) => {
      const dados = await response.json()
      console.log(dados)
      setComunidades([...comunidades, dados])
    })
  }

  const [seguidores, setSeguidores] = useState([])
  useEffect(() => {
    // Seguindo
    fetch(`https://api.github.com/users/${githubUser}/following`)
      .then((response) => {
        if(response.ok) {
          return response.json()
        }
        throw new Error(`Aconteceu algo de errado: ${response.status}`)
      })
      .then((resp) => { setSeguidores(resp) })
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    // API GraphQL
    fetch(
      'https://graphql.datocms.com/', 
      {
        method: 'POST',
        headers: {
          'Authorization': '055637138a7350deb86fc175aae036', 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          "query": `query { 
            allCommunities {
              id
              title
              imageUrl
              link
              creatorSlug
            }
          }`
        }),
      }
    )
    .then((response) => response.json())
    .then((res) => setComunidades(res.data.allCommunities))
  }, [])

  return (
    <>
      <AlurakutMenu githubUser={githubUser}></AlurakutMenu>
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUser={githubUser}></ProfileSideBar>
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

              <OrkutNostalgicIconSet sexy={1} legal={2} confiavel={3}/>
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleCreateCommunity}>
              <div>
                <input 
                  name="title"
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input 
                  name="image"
                  placeholder="Coloque uma URL para usarmos de capa" 
                  aria-label="Coloque uma URL para usarmos de capa"
                  type="text"
                />
              </div>
              <div>
                <input 
                  name="link"
                  placeholder="Coloque uma URL para acesso à comunidade" 
                  aria-label="Coloque uma URL para acesso à comunidade"
                  type="text"
                />
              </div>
              <button>
                Criar comunidade
              </button>

            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <CommunityCard 
            title="Seguindo"
            items={seguidores}
            type={SeguindoDTO}
          />

          <CommunityCard 
            title="Comunidades"
            items={comunidades}
            type={ComunidadesDTO}
          />

          <CommunityCard
            title="Pessoas da Comunidade"
            items={pessoasFavoritas}
            type={PessoasComunidadeDTO}
          />
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN
  const { githubUser } = jwt.decode(token);
  const { message } = await fetch(`https://api.github.com/users/${githubUser}`)
  .then((resp) => resp.json())

  if(message) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  return {
    props: {
      githubUser
    }, 
  }
}
