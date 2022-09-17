import logoImg from '../assets/logo-eSports.svg'


export const HeaderLogo = () => {
  return (
    <>
      <img src={logoImg} alt="" />
      <h1 className='text-6xl text-white font-black mt-20'>Seu <span className='text-transparent bg-nlw-gradient bg-clip-text
        '>
        duo</span>está aqui</h1>
    </>
  )
}
