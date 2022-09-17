import * as Dialog from '@radix-ui/react-dialog'
import * as CheckBox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { Check, GameController } from 'phosphor-react'

import { Input } from './Form/Input'
import { useEffect, useState } from 'react'
import { Game } from '../pages/Home'
import axios from 'axios';

export const CreateAdModal = () => {
  const [weekDays, setWeekDays] = useState<string[]>(['1'])
  const [games, setGames] = useState<Game[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)


  useEffect(() => {
    axios('http://localhost:3333/games').then(response => setGames(response.data))
  }, [])

  const handleCreateAd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    if (!data.name) return


    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        "name": data.name,
        "yearsPlaying": Number(data.yearsPlaying),
        "discord": data.discord,
        "weekDays": weekDays.map(Number),
        "hourStart": data.hourStart,
        "hourEnd": data.hourEnd,
        "useVoiceChannel": useVoiceChannel

      })
      alert('Anúncio criado com sucesso')
      window.location.reload();
    } catch (err) {
      console.log(err)
      alert('Erro ao criar o anúncio')
    }

    console.log(data)
    console.log(weekDays)
    console.log(useVoiceChannel)

  }


  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

      <Dialog.Content className='fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
        <Dialog.Title className='text-3xl text-white font-black'>Publique um anúncio</Dialog.Title>
        <form
          onSubmit={handleCreateAd}
          className='mt-8 flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label className='font-semibold' htmlFor="game">Qual o Game?</label>
            <select
              name='game'
              id='game'
              className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none'
              defaultValue=''
            >
              <option value='' disabled>Selecione o game que deseja jogar</option>

              {games.map(game => {
                return <option key={game.id} value={game.id}>{game.title}</option>
              })}

            </select>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input name='name' id='name' placeholder='Como te chamam dentro do game' />
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
              <Input type="number" name='yearsPlaying' id='yearsPlaying' placeholder='Tudo bem ser 0' />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="discord">Qual seu discord?</label>
              <Input type="text" name="discord" id="discord" placeholder='Usuario#0000' />
            </div>
          </div>

          <div className='flex gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="weekDays">Quando costuma jogar</label>


              <ToggleGroup.Root
                type='multiple'
                className='grid  grid-cols-4 gap-2'
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value='0'
                  title='Domingo'
                  className={`w-8 h-8 rounded  ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='1'
                  className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title='Segunda'>
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='2'
                  className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title='Terça'>
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='3'
                  className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title='Quarta'>
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='4'
                  className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title='Quinta'>
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='5'
                  className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title='Sexta'>
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='6'
                  className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title='Sábado'>
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className='flex flex-col gap-2 flex-1'>
              <label htmlFor="hourStart">Qual horário do dia?</label>

              <div className='grid grid-cols-2 gap-2'>
                <Input name='hourStart' id='hourStart' type="time" placeholder='De' />
                <Input name='hourEnd' id='hourEnd' type="time" placeholder='Até' />
              </div>
            </div>
          </div>

          <label className='mt-2 flex gap-2 text-sm items-center'>
            <CheckBox.Root
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUseVoiceChannel(true)
                } else {
                  setUseVoiceChannel(false)
                }
              }}
              className='w-6 h-6 rounded p-1 bg-zinc-900'>
              <CheckBox.Indicator>
                <Check className='w-4 h-4 text-emerald-400' />
              </CheckBox.Indicator>
            </CheckBox.Root>
            Costumo me conectar no chat de voz
          </label>

          <footer className='mt-4 flex justify-end gap-4'>
            <Dialog.Close
              type='button'
              className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
              Cancelar
            </Dialog.Close>
            <button type='submit'
              className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal >
  )
}
