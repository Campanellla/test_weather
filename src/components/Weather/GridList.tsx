import styled from 'styled-components'
import { Placeholder } from 'semantic-ui-react'

export const GridListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;

  padding: 0 1rem;

  border-top: black 1px solid;
  border-bottom: black 1px solid;

  div:nth-child(1),
  div:nth-child(2) {
    border: none;
  }
`

const GridItemStyles = styled.div`
  border-top: black 1px solid;
  padding: 0.25rem 0rem;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;

  div:first-child {
    font-size: 0.85em;
    font-weight: 300;
    opacity: 0.85;
  }
`

type GridItemProps = { label: string; content?: string; placeholder?: boolean }

export const GridItem: React.FunctionComponent<GridItemProps> = ({
  label,
  content,
  placeholder,
}) => (
  <GridItemStyles>
    <div>{label}</div>
    {!placeholder ? (
      <div>{content}</div>
    ) : (
      <Placeholder style={{ height: '1.5em', width: '100%' }} />
    )}
  </GridItemStyles>
)
