from aiogram import Bot, Dispatcher, executor, types

TOKEN = "SEU_TOKEN"

bot = Bot(TOKEN)
dp = Dispatcher(bot)

@dp.message_handler(commands=["start"])
async def start(msg: types.Message):
    await msg.answer(
        "🎱 Bingo TON\n\nClique em PLAY para jogar.",
        reply_markup=types.ReplyKeyboardMarkup(
            resize_keyboard=True
        ).add(
            types.KeyboardButton(
                "PLAY 🎱",
                web_app=types.WebAppInfo(url="https://SEU_DOMINIO")
            )
        )
    )

executor.start_polling(dp)
