function nameShortener (categoryName) {
    let shortName
    // If categoryName matches one of the filters it gets shortened
    if (categoryName === 'Técnico de aires acondicionados'){
        shortName = 'Técnico de AC'
    }
    else {
        shortName = categoryName
    }
  
    return shortName
  }
  
export default nameShortener
  