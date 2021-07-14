import { ProfileRelationsBoxWrapper } from "../ProfileRelations"

export default function CommunityCard (props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="subTitle">{`${props.title} (${props.items.length})`}</h2>
      <ul>
        {props.items.map((itemAtual, index) => {
          const item = new props.type(itemAtual)
          if (index >= 6) return
          return (
            <li key={item.key}>
              <a href={item.link}>
                <img src={item.image} />
                <span>{item.name}</span>
              </a>
            </li>
          )
        }
        )}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

class CommunityAbstract {
  constructor(item) {
    this.item = item
  }
  get image () { throw 'Implement this' }
  get link () { throw 'Implement this' }
  get name () { throw 'Implement this' }
  get key () { throw 'Implement this' }
}

class PessoasComunidadeDTO extends CommunityAbstract {
  constructor(item) {
    super(item)
  }
  get image () { return `https://github.com/${this.item}.png` }
  get link () { return `https://github.com/${this.item}` }
  get name () { return this.item }
  get key () { return this.item }
}

class ComunidadesDTO extends CommunityAbstract {
  constructor(item) {
    super(item)
  }
  get image () { return this.item.image }
  get link () { return this.item.link }
  get name () { return this.item.title }
  get key () { return this.item.id }
}

class SeguindoDTO extends CommunityAbstract {
  constructor(item) {
    super(item)
  }
  get image () { return this.item.avatar_url }
  get link () { return this.item.html_url }
  get name () { return this.item.login }
  get key () { return this.item.id }
}

export {
  CommunityCard,
  PessoasComunidadeDTO,
  ComunidadesDTO,
  SeguindoDTO,
}