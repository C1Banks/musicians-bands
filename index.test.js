const { sequelize } = require('./db');
const { Band, Musician, Song } = require('./index')

describe('Band, Musician, and Song Models', () => {
    /**
     * Runs the code prior to all tests
     */
    
    beforeAll(async () => {
       
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    

    test('can create a Band', async () => {
        const testBand = await Band.create({ name: 'AC/DC', genre: 'Rock' });
        expect(testBand.name).toBe('AC/DC');
    })

    test('can create a Musician', async () => {
        const testMusician = await Musician.create({ name: 'Will Smith', instrument: 'Vocals' });
        expect(testMusician.instrument).toBe('Vocals');
    })

    test('can create a Song', async () => {
        const testSong = await Song.create({ title: 'Kill Bill', year: 2023, length: 204});
        expect(testSong.year).toBe(2023);
    })

    test('can update a Band', async () => {

        const band = await Band.findByPk(1);
        await band.update({ name: 'AC/DC', genre: 'Country' });
        expect(band.genre).toBe('Country');
    })

   test('can update a Musician', async () => {
        // TODO - test updating a musician
        const musician = await Musician.findByPk(1);
        await musician.update({ name: 'Penelope Huff', instrument: 'Vocals'});
        expect(musician.name).toBe('Penelope Huff');
    })

    test('can update a Song', async () => {
        // TODO - test updating a musician
        const song = await Song.findByPk(1);
        await song.update({  title: 'Vegas', year: 2023, length: 204});
        expect(song.title).toBe('Vegas');
    })

  test('can delete a Band', async () => {
    let foundBand = await Band.findByPk(1);
    let deletedBand = await foundBand.destroy();
    let deletedBand1 = await Band.findByPk(1);
    expect(deletedBand1).toBe(null);
    })

   test('can delete a Musician', async () => {
    let foundMusician = await Musician.findByPk(1);
    let deletedMusician = await foundMusician.destroy();
    let deletedMusician1 = await Musician.findByPk(1);
    expect(deletedMusician1).toBe(null);
    })

    test('can delete a Song', async () => {
        let foundSong = await Song.findByPk(1);
        let deletedSong = await foundSong.destroy();
        let deletedSong1 = await Song.findByPk(1);
        expect(deletedSong1).toBe(null);
        }) 

        

    test('bands can have multiple musicians', async () => {
      
        

        await Band.create({name:"Lumineers", genre: "Pop"});
        await Band.create({name:"Jackson Five", genre: "Pop"});
        await Band.create({name:"Silk Sonic", genre: "R&B"});
        
         await Musician.create({name: "John Legend", instrument: "Singer"})
         await Musician.create({name: "Micheal Jackson", instrument: "Singer"})
         await Musician.create({name: "Bruno Marz", instrument: "Singer"})

        const bandWithMusicians = Band.findByPk(0, {include: Musician});
        

         //await bands[1].addMusician(musicians[1]);
         //await bands[2].addMusician(musicians[2]);
         const bands = await Band.findAll();
         console.log(bandWithMusicians.Musicians[0]);
         const musicians = await Musician.findAll();
         const songs = await Song.findAll();

         await bands[0].addMusician(musicians[0], musicians[1], musicians[2]);

        expect(bandWithMusicians.Musicians[0]).toHaveProperty("name", "Micheal Jackson");
    })
})