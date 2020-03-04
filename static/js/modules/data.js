export const Data = {
    filterUsers: (data) => {
        let noISBN = data.filter(book => {
            return book.ISBN.toString().length === 13
          })
        
          const userIdArray = noISBN.map(book => {
            
            return {
              lener: book.Lener,
              inboekDatum: book.inboekdatum,
              genre: book.genre,
              pubJaar: book["jaar publ."],
              PPN: +book.PPN,
              ISBN: +book.ISBN,
              titel: book.titel,
              woonplaats: book.woonplaats,
              inschrijfDat: book['inschr. datum'],
              leenDatum: book.transdat,
              geboorteJaar: book.geboortejaar,
              postcode: book.postcode
            };
          })
          .filter(book => !isNaN(book.ISBN))
        
          return userIdArray;
    },
    groupBy: (data) => {
        console.log('length: ', data.length)
        const group = data.reduce((objectsByKeyValue, object) => {
          objectsByKeyValue[object.lener] = [
            ...(objectsByKeyValue[object.lener] || []),
            object
          ];
          return objectsByKeyValue;
        }, []);
      
        return group;
    }
}