<script setup lang="ts">
const gameState = reactive({
  start: false,
})
const editStatePlayerName = reactive({
  playerOne: false,
  playerTwo: false,
})
const playerName = reactive({
  playerOne: 'Player One',
  playerTwo: 'Player Two',
})
const score = reactive({
  playerOne: 0,
  playerTwo: 0,
})

function resetGame() {
  gameState.start = false
  editStatePlayerName.playerOne = false
  editStatePlayerName.playerTwo = false
  playerName.playerOne = 'Player One'
  playerName.playerTwo = 'Player Two'
  score.playerOne = 0
  score.playerTwo = 0
}

function addScore(player: keyof (typeof score)) {
  score[player]++
}
function subtractScore(player: keyof (typeof score)) {
  if (score[player] !== 0)
    score[player]--
}

const playerOneState = computed(() => {
  let matchPoint = false
  let winner = false

  if (score.playerOne >= 20 && score.playerOne - score.playerTwo >= 1)
    matchPoint = true

  if (score.playerOne >= 21 && score.playerOne - score.playerTwo >= 2)
    winner = true

  return {
    winner,
    matchPoint,
  }
})

const playerTwoState = computed(() => {
  let matchPoint = false
  let winner = false

  if (score.playerTwo >= 20 && score.playerTwo - score.playerOne >= 1)
    matchPoint = true
  else
    matchPoint = false

  if (score.playerTwo >= 21 && score.playerTwo - score.playerOne >= 2)
    winner = true

  return {
    winner,
    matchPoint,
  }
})
</script>

<template>
  <div class="w-full bg-gray-100 dark:bg-slate-900 mx-auto container min-h-screen">
    <div class="h-screen w-full portrait:hidden flex flex-col justify-center items-center space-y-2">
      <button v-if="!gameState.start" class="bg-green-500 p-2 lg:w-1/5 w-1/4 rounded-full text-white text-center" @click="gameState.start = !gameState.start">
        Start
      </button>
      <button v-else class="bg-red-500 p-2 lg:w-1/5 w-1/4 rounded-full text-white text-center" @click="resetGame">
        Reset
      </button>
      <div class="w-full flex justify-center items-center space-x-8">
        <div class="flex flex-col space-y-4 w-full justify-center items-center">
          <div class="flex">
            <div v-if="editStatePlayerName.playerOne" class="flex space-x-2">
              <input v-model="playerName.playerOne" type="text" class="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="This is placeholder">
              <button class="dark:text-white text-slate-900" @click="editStatePlayerName.playerOne = !editStatePlayerName.playerOne">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-save h-5 w-5" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><path d="M17 21v-8H7v8M7 3v5h8" /></svg>
              </button>
            </div>
            <div v-else class="flex space-x-2">
              <h3 class="text-xl dark:text-white text-slate-900">
                {{ playerName.playerOne }}
              </h3>
              <button class="dark:text-white text-slate-900" @click="editStatePlayerName.playerOne = !editStatePlayerName.playerOne">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-edit h-4 w-4" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
              </button>
            </div>
          </div>
          <div class="h-40 lg:h-96 bg-yellow-500 rounded-lg w-2/3 flex items-center justify-center relative">
            <h3 class="text-4xl font-bold text-center dark:text-white text-slate-900">
              {{ score.playerOne }}
            </h3>
            <div v-if="playerOneState.winner" class="w-full flex flex-col justify-center items-center absolute bottom-5">
              <p class="text-white text-sm lg:text-xl font-bold">
                {{ playerName.playerOne }} is the Winner
              </p>
            </div>
            <div v-else-if="playerOneState.matchPoint && !playerOneState.winner" class="w-full flex flex-col justify-center items-center absolute bottom-5">
              <p class="text-white text-sm lg:text-xl font-bold">
                Match Point
              </p>
            </div>
          </div>
          <div v-if="gameState.start" class="flex space-x-4 w-full justify-center items-center">
            <button class="bg-green-500 p-2 lg:w-1/5 w-1/4 rounded-full text-white text-center" @click="addScore('playerOne')">
              +
            </button>
            <button class="bg-red-500 p-2 lg:w-1/5 w-1/4 rounded-full text-white text-center" @click="subtractScore('playerOne')">
              -
            </button>
          </div>
        </div>

        <h3 class="font-bold text-3xl dark:text-white text-slate-900">
          VS
        </h3>

        <div class="flex flex-col space-y-4 w-full justify-center items-center">
          <div class="flex">
            <div v-if="editStatePlayerName.playerTwo" class="flex space-x-2">
              <input v-model="playerName.playerTwo" type="text" class="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="This is placeholder">
              <button class="dark:text-white text-slate-900" @click="editStatePlayerName.playerTwo = !editStatePlayerName.playerTwo">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-save h-5 w-5" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><path d="M17 21v-8H7v8M7 3v5h8" /></svg>
              </button>
            </div>
            <div v-else class="flex space-x-2">
              <h3 class="text-xl dark:text-white text-slate-900">
                {{ playerName.playerTwo }}
              </h3>
              <button class="dark:text-white text-slate-900" @click="editStatePlayerName.playerTwo = !editStatePlayerName.playerTwo">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-edit h-4 w-4" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
              </button>
            </div>
          </div>
          <div class="cursor-pointer h-40 lg:h-96 bg-blue-500 rounded-lg w-2/3 flex items-center justify-center relative">
            <h3 class="text-4xl font-bold text-center text-white">
              {{ score.playerTwo }}
            </h3>
            <div v-if="playerTwoState.winner" class="w-full flex flex-col justify-center items-center absolute bottom-5">
              <p class="text-white text-sm lg:text-xl font-bold">
                {{ playerName.playerTwo }} is the Winner
              </p>
            </div>
            <div v-else-if="playerTwoState.matchPoint && !playerTwoState.winner" class="w-full flex flex-col justify-center items-center absolute bottom-5">
              <p class="text-white text-sm lg:text-xl font-bold">
                Match Point
              </p>
            </div>
          </div>
          <div v-if="gameState.start" class="flex space-x-4 w-full justify-center items-center">
            <button class="bg-green-500 p-2 lg:w-1/5 w-1/4 rounded-full text-white text-center" @click="addScore('playerTwo')">
              +
            </button>
            <button class="bg-red-500 p-2 lg:w-1/5 w-1/4 rounded-full text-white text-center" @click="subtractScore('playerTwo')">
              -
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full bg-gray-100 dark:bg-slate-900 landscape:hidden min-h-screen flex items-center justify-center overflow-hidden">
      <div class="w-full flex flex-col items-center justify-center space-y-8">
        <div
          class="h-8 w-8 text-white"
        >
          <svg data-slot="icon" aria-hidden="true" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <h3 class="text-white text-center text-xl">
          Rotate Your Phone
        </h3>
      </div>
    </div>
  </div>
</template>
