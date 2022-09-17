
interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number
}

export const GameBanner = ({ bannerUrl, title, adsCount }: GameBannerProps) => {
  return (
    <>
      <a href="" className='relative rounded-lg overflow-hidden'>
        <img src={bannerUrl} alt="" />

        <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0'>
          <strong className='font-bold text-white block'>{title}</strong>
          <strong className='text-zinc-300 text-sm mt-1' >{adsCount} anúncio(s)</strong>
        </div>
      </a>
    </>)
}
