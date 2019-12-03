m1 = Moodboard.create(artist_name: "Ken", theme: "Rally Racing")
m2 = Moodboard.create(artist_name: "Matt", theme: "BMX")

i1 = Image.create(moodboard: m1, url: "https://media1.giphy.com/media/GumCYlOBdW86c/giphy.webp?cid=790b76111fc676789336afc39511bb3de94ca6168c3e9fb1&rid=giphy.webp")
i2 = Image.create(moodboard: m1, url: "https://media0.giphy.com/media/3o7TKuCdukvBfYo4RW/200.webp?cid=790b7611d597b9292b346fa6452188e59f6fd572e6a8df47&rid=200.webp")

i3 = Image.create(moodboard: m2, url: "https://media0.giphy.com/media/kEKcRYLO82a3HlBTBA/200.webp?cid=790b76113ac2b0ac5fb76dbb8782087c590c4e626e704a28&rid=200.webp")
i4 = Image.create(moodboard: m2, url: "https://media3.giphy.com/media/VhzLoDEalePDB5jogn/200.webp?cid=790b76113ac2b0ac5fb76dbb8782087c590c4e626e704a28&rid=200.webp")
