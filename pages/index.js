import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import CommunityCard from '../src/components/CommunityCard'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons' 
import { useState } from 'react'

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

export default function Home() {
  const [comunidades, setComunidades] = useState([
    {
      id: new Date().toISOString(),
      title: 'Exercism',
      image: 'https://github.com/exercism.png',
      link: 'https://exercism.io/'
    },
    {
      id: new Date().toISOString(),
      title: 'Dev.to',
      image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--pcSkTMZL--/c_limit,f_auto,fl_progressive,q_80,w_190/https://practicaldev-herokuapp-com.freetls.fastly.net/assets/devlogo-pwa-512.png',
      link: 'https://dev.to/'
    },

])
  const githubUser = 'AlNuN'
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
      id: new Date().toISOString(),
      title: dadosForm.get('title'),
      image: dadosForm.get('image'),
      link: dadosForm.get('link'),
    }

    setComunidades([...comunidades, comunidade])
  }

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
            title="Comunidades"
            items={comunidades}
            imageTemplate={(a) => a.image}
            linkTemplate={(a) => a.link}
          />

          <CommunityCard
            title="Pessoas da Comunidade"
            items={pessoasFavoritas}
            imageTemplate={(a) => `https://github.com/${a}.png`}
            linkTemplate={(a) => `https://github.com/${a}`}
          />
        </div>
      </MainGrid>
    </>
  )
}
