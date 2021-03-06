import { useParams } from 'react-router-dom'

import { useSimpleQuery } from '../hooks'
import { Button } from '../ui'
import { utils } from '../utils'
import style from './style.module.sass'

export const Photos = () => {
  const { albumId } = useParams()
  const [photos, photosError] = useSimpleQuery('photos', { albumId })

  const error = utils.createErrorMessage({
    photosError,
  })

  if (error) return <Error>{error}</Error>

  return (
    <div>
      <br />

      <p className={style.text_center}>
        Photos ({photos?.length ?? '0'}) &nbsp;
        <Button.GoBack />
      </p>

      <br />

      <div className={style.photos}>
        {photos?.map(({ id, thumbnailUrl, url, title }) => (
          <a key={id} href={url} target="_blank">
            <img src={thumbnailUrl} title={title} />
          </a>
        ))}
      </div>
    </div>
  )
}
