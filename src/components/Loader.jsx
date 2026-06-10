import { Oval } from 'react-loader-spinner'

export default function Loader() {
  return (
    <Oval
      height={80}
      width={80}
      color="#ffffff"
      wrapperStyle={{}}
      wrapperClass=""
      visible={false}
      ariaLabel='oval-loading'
      secondaryColor="#cfecff"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  )
}