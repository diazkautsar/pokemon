/** @jsxImportSource @emotion/react */
import React, { FunctionComponent } from 'react'
import Image from 'next/image'

type Props = {
  name?: string,
  types?: 'type' | 'move' | 'abilities'
}

const Tags: FunctionComponent<Props> = ({ name, types }) => {

  const getColor = () => {
    switch (types) {
      case 'move':
        return '#4b7cf3'
      
      case 'type':
        return 'black'
      
      case 'abilities':
        return 'red'
        
      default:
        return '#fafafa'
    }
  }

  return (
    <div className="tag" css={{ background: 'none', borderColor: getColor(), color: getColor() }}>
      <div css={{
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
        alignContent: 'center',
        alignItems: 'center'
      }}>
        <div css={{ marginRight: '2px' }}>
          {/* <Image
            src="/move.png"
            alt="Move Icon"
            width={15}
            height={15}
          /> */}
        </div>
        <div> { name } </div>
      </div>
    </div>
  )
}

export default Tags