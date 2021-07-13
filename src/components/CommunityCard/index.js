import { ProfileRelationsBoxWrapper } from "../ProfileRelations"

export default function CommunityCard (props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="subTitle">{`${props.title} (${props.items.length})`}</h2>
      <ul>
        {props.items.map((itemAtual, index) => {
          if (index >= 6) return
          return (
            <li key={itemAtual.id || itemAtual}>
              <a href={props.linkTemplate(itemAtual)}>
                <img src={props.imageTemplate(itemAtual)} />
                <span>{itemAtual.title || itemAtual}</span>
              </a>
            </li>
          )
        }
        )}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}
