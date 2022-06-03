// Fetch projects on Pix4.
const https = require('https');
const cheerio = require('cheerio');
const ascii =  require('ascii-table');
const options = {
  hostname: 'github.com',
  port: 443,
  path: '/orgs/Pix4Devs/repositories',
  headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36',
      'Cache-Control': 'no-cache'
  }
};


https.get(options, (res) => {
    var table = new ascii('Pix4 Projects')
    table.setHeading('Project', 'Source')

    if(res.statusCode == 200){
        var full_data;
        res.on('data', (d) => {
            full_data += d;
        });
        res.on("end", () => {
            content = full_data;
            const $ = cheerio.load(content);
            $('.Box-row').each((i,el)=>{
                const repo = $(el)
                    .find('.d-inline-block')
                    .text();
                
                const rep = String(repo.trim());
                const repos  = rep.split('\n');     
                repos.forEach(element => {
                    if(element === '\n' || element === '' || element === ' '){
                        
                    }
                    else{
                        table
                        .addRow(`${element}`,`https://github.com/Pix4Devs/${element}`)     
                    }
                });     
            });
            console.log(table.toString());  
        });
    }
    else{
        console.log('Err: '+res.statusCode,res.statusMessage)
    }

}).on('error', (err) => {
    console.log('Err: '+err);
});
