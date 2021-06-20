import React from 'react'
import { Dimensions, View,Text, Image } from 'react-native'
import { EvilIcons } from '@expo/vector-icons';

const {width, height} = Dimensions.get('window')

const HomeHeader = ({}) => {

    return(
        <View style={{width:width, padding:8,flexDirection:'row', justifyContent:'space-between'}}>
        
        <View style={{width:'70%',alignSelf:'center'}}>
        <View style={{flexDirection:'row'}}>
        <EvilIcons name="location" size={24} color="#0a789f" />
        <Text style={{fontFamily:'black',fontSize:20 }}>Home</Text>
        </View>
        <Text numberOfLines={1} style={{fontFamily:'light'}}> Krishna Changa Naik Marg Seawoods West, Sector 44A, Seawoods Navi Mumbai, Maharashtra 400706</Text>
        </View>
        
        <Image
            style={{height:60, width:60, borderRadius:60}}
            source={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAB+1BMVEX1/P/1+///4/P/ve3/mh//LmL3fBa66v/rHF7/M7v/6fj7///4//8cI1wAG176fRQAI1xXU30SHFn/wvL/nRwAAE/YbyQADVP/zDNZ7P/VwNamaj6an7MAAEwRI1z/4vNXSHy2pL8EFVUAIlZeJV2LbZ0EGVb0HF4AFl8AEVTt9Plb8/8AHV7l9/8ACVKLgKB2fJn/49u7jr//lgDhVAD27vr/ALTN1N+7wdDc4+tYXoSwtsfT2uRCO3DlHF7jqtv/1S81PGzGZyzhiilhRU/FezRuTEzT8f/31PD7lNhqcJCOlKyT8f+qH11CSHSXH11x7v++9v9JIlz/bIjVHV7/y8ro0ORzXI3KK2D/zO+4Hl3/yRb92G5xd5X47MO3psDHl8c6JWb/XsRrKHiXiqlNxt4+lrWeVjyOT0FDMVOtXDdaOk/7jBuSX0R7U0n/snL/vpPOgDD8gNL9bsz+ScL/rbX/f5R0J15+DFT/cIv/RnD/nKnbtNcwMljRqj2qjEaSektmWFL+0Ee/nUJJQ1b47MH64p7823z39N+agEl7aE+/H5yZIYr/p9qeeqtLI2yXK4wnTHk3gaPa2/9An7wvZo1RI/96Yf/Au/+Ne/9jQ/+Qfv+vpv9rTf/g4v8AAGHcy7v/r02If4uLPTh6OD9mM0fETBf/yKzPayjbsBkOAAATLklEQVR4nO2djV8TZ7bHQ4CWzMyThCcZA8gkMGDIxDAguUIIb0YQMdFQrRtUWgHFtviC1bq1d7e0W+3d9V4rrq3r3m3rdt1t7/XPvOeZmSQzySQkIcmMt/P7qMhkIPN855zznHPmmYmtpZxs/19UfpQWA4uBxcBiYDGwGFgMLAYWA4uBxcBiYDGwGFgMLAYWAyKLgcWAyGJgMSCyGFgMiCwGFgMii4EpGTBHm4zXfAwYavwK06DfrS/TMWCYpXEH01QIZmPALJ2663CcOnW0Ib9dX6ZjcG/c4XCMj59qoiWYjsHFu584HHfvUr9iBtl40MyAYDoGNiYwfu9XPi8QCEd/9Qxs5QkwNE2Dr5B/6/R+ZmRQRgwdjvUmO9OJdPz93ok6QXijGNBMLIlZH4+JeB+Xouvya98gBgwdS7M8wj5WluBL/9oY0JNxFiMfG++NTYbD4elYKjldH2cwNQOGyScKdIznkYh7w1JEtNUzKBrCoGV4eE8rhjHaJqcnJibD0mDpXg5hNmWr22SgPhwjGJzs7j5b9scZmpkYTbAcx7Ici5JTYYJASEzWx/8LZQSDlrPAoNxw6HAKcwJGfiKEeJaNi8gX3yNxqP14jLAD2+nTZV5kWlKsD/ndbv/G4ODgOQT/QRjheCPcQJIxDOgyVkBPJDggcG75fLukofNnBsEYEO5tFARjGJQRPQUzoHvwQntWHR1DZ9wIbIGNt5SFQEt/apCxDMgEVzCQFIfcCAi8m2Mw1OFH7uVBN/Klw+UgnO7uPj1cy1EZyoCeGE32asZFTwGCwY729t8e+VRGsLxx5gxEhqGhZTfi02Xe9J1uouEaDsNIBjDh8TyL1BDolM99v739d+2fHpENYQicYAO5z5zvGLoElhAvZe3SXAN/T9fgDgYyoGMsJP9ISKoOm8l8tkyM4N9z4QB8ALThPieFBba3xBjp0zB8+mz3O28WgzDCfHwNIzY/EFsLGfZvjxx5Nx8SkQTB757tIO7ATuqHBGDwjgyi+gMxjgHdy+KZAIUQG1a2MBPsBoz60yPZWCDrvhuEzgzBBHHOzydLDHIYgsE7e+Wf+jKQwRTH9VBUArPZ8o9OYPeF9t8dOfL7do2GLl26MAQIOjrOuxFXolgEP+iuLRwYGg96eig7NcILSiuEgfiAiCf8pr1A0viJhu77+fdLRYThs2f3LsX0ZCCDSYqy2+09LGKnpUOnk7x7mZjBu4UM2rMMiCHw4VK/sNZDMo5BmtskDKjOIMYxKVmC/LCj/ffFZqBiABGBjUlN1X2+u1pGMWCmOZwmDOwZKIjY9GgqNcr7z7UDg0/LMVh243gq1RubrGMnwTAGMTaYlBhQmYQIs6Qg8JARt5P8iOj8/fuzOgw6LrgRFgSRZROp6XpZg4EM+BGJAWgTiTzPI+S+lB30eZgO/R06DGYhW+D5INTSAhufmGTq0VUxkkEyy4Cyfz42NjaD3Oezg4ZsCBJkHQZDUETvju2uzAAyzIqJ3jrYgmEMJljcmWVgty+1ejzAIGf+ZwiDC3oMNvz8nAe0HgQIGENB/eYyCLM4YVcxaNUwaD/nJrVTnsHsmUvZiYGfa4W9+zASd1AIsaP0fjvMRjGwMQks9uQM4aI0qrwvQERQhcShjlnkhqpJ9oUgYbAuoNAXx459GUL81Ohob3g/caHhDBhG/yTRo0I+KNrJmV3BKuuXNKt8L1VLEDGVmEh23g2G/nCsq+vYVxHk43mRK1VPmoEB897q6oPLOhSYCQ7hQN4MWj2HgqooKCkbJDuGPlMYQP2M+zzSzuLDLtDDn1AkFIqg/UBoNIMHq6urXauPdF6h0zhrCBANYFhjvP++BsGQmwSIjnPLQx3n/bIvkHAw5snbQVfX16Gvvnz4VahkUW08g/9Y7br86L3V93QNASqFNYAQIFYAmoMkqdAOlknpvAE10/nl5dkOqZeEpZ3XebwjMeh6ILuEWLshNJYB80cYPnN59YHei/SoD/GfX/S0KiITgzYgLLvdgzBBkNZBh1Q8z0KCdEj+AYTYL7pyeiiWrCeNZkDs4BHzJ107gPdO80iybIXBLu8f1BqC1D75LFs6D81u+KWIKEcPp+wMRMcehvhRszJgpENcvaz/YjjBI2EFUh6FAl9oCO3gAhdyCC4hPxLmlJ3nBIxyCLp2MDulZcBcflRpgGgwA9sjEhT/WOJo6HAco2BwZb3VI+lQkFSO2riY1eylQVIurXvyniM7w7FjX/znTgRjbVuBeVD6bZvNACg80k8QGJqejKVIvxTzeKZPEkL+c4O6Oud3+xGP5lSeE3T+17GuYw++/FoMYczFtGYATti1WuERNp5BCdHh3gTL8kiRtMRIaiCXEERD4VBrDgE4gw8hGQBCApooiAaXgUGXaexAV0x4lPWBH5BOQGUSZ3bVBCRnQAQAoIM5oWi4f1otEYVMwyAs+hAWUXJzracyZZY8GgIkp+KIGwVXDmE+VcygRIpuHgbMhA9znT12iqLIX/Il+5XSF6RSBQwAwgzqGyP5JU73TrTUXjsawQBK3aMjnaSxftRehQKthRA80p/dIFmvh0ena6VgAANmNE0swE5B3U8F9h57ThcLIcgkViAgBMmKnXiN65Waz4BOsUInjP0oIKjKDooNoVXJmvmx3T7AwLO1ddaazoAmpVI/ZScEqL3HvacheNZ5NAP51dyhIEa1ddaabwcJTJqp1fpBaQYrOCiVUZ65FQFxU2/AdWd6ikUoECAIKhq2PCcoWtJhABW3b07BsesrdUXWVAzADLg16miFVkBlNpPJzZ4sBh0Gnj6MV3I1xNzcxSryAoMYMDGpnQyxoCJHSLICH+TZhNJ8LfYFz64ApaR6y+ejVZtCkxnQo7ywScGsWA4BRWUyATj3gYSABkAIszKEIgaedUCwq0meBJGv9siabQcJLGbsMMDSDKjMCIL6INFPdfJo4Orjx99AweTL2PWSJEAQ7CuoInDVXbXmMmAmSUSE0ZQxgh5egOIRqomZIBp4fO9J613Hhl+6LldgBh7iCHimGAuq8tCazGCCVa64l1QPi/0DG0/RANTRA99cAVpLjnsDpA2/VEBgfYZHwQIEcm8lVl1EaC4DGkJinMp6vTLtUbnviBLYv/HYcc/x2D8wsOF4Yr946hOH46mfywQ8as2N9QkYCSs6UZIvuW7LKAaaW1bJYuS4VCPae9Y2R0Y2A2D7I+DrmRFFSR4hx5WLgaV7jqtPHztOBa6Q+5+v+nHykEorM0EeoyDeLawlW0lvBaOqEDT+OtOTu6o7NgmDTgIgiThR4HlukwqwXJqiOskCBCKIAd84lsADrjhU2oD4EFQJSw24Q606CFo9CInVXW9pMANmaXz8bv6ApPSAWkuQ29OCgs9HGAQ5oBLnfLIwxMFP7EtX7qkRPB5AQeV1n0RKENDKmC4BKXlmq7vzsdEMjo6PP1ExmIZ5IS2CI7OJkc3+tTUyFa6RiWKtX9JaJx547HjyicOhNQM+qezQP0a0Ptda2FbKMzgULOyzG8sAICypz0nYB1aMfGgzkwuJ2pi4KQxcdRTozzBHBLI7yKGxxPgVBlVWTo1mYNNW9HQaw8y/aSc9M90kIcOBM2gRwMwoXZdUVKKLYGI70IruFZGQzlAB0kPST5HifCGEp371qh396rEgHlSXIDSVAR3jkC9uJzVTyaopgGBqeKoKiRAQxYxmF/2eWo4BJEnVlU3NZEAyZSEuG0HpLlom4UP+gT/nGMBUt6lNLfcwBEigSy7nNZwBHedx2r5XL5WybwpgChuKQ1wdgNm0YJeyZrAu4JJ3uxjOgKy+4TOSI5Qrmsh02cmCKVxVPIHtKdyh7LSwUnXh2EQGdBwHR+ykeVAeAZko1xCERvSYpAbCaFGRVS4gzPmqTRObyECqmzEayVTSSKQCIyykjFevDki1duV2AGZQbcnUTAZxsrwWCSijM2YdCj0JkfQRuLViZqUZkPZB1auzmsaATrGQHz4TUTBdEQMSG0VR5DaLEZTOkjxzGIlVL8ppFgMmzCPxg8OHr2FN0leeQmatX89zSs6NntYZjBNVEmgSA4ZumYSq+dnh7u7Dz9XLU/ekoLtnyWppjtwOUv06xWYwIAsuOBbx3wKD7mv5TlKNKjEreDxjUJGzhQtSzMGAmcQCWS3CPid2cE3M37dQk/Q9weNZ74N3EWpA0BQGCZgNnj1DCXID4uHnPkEd5kosuSitJY+OWud2ZwRyW1T+6nsVHtF4BgwUSuja4cPSbendh7/lff05BlSmf6SzOvXpaAYL5LlJvOrSO/Nd5Q9dazwDcmnpuUIAGPwF53JfSIR4UX7o1b5ElrMJLEqpbmJgvnvxVzMxSPLitTyDZ5jNZI1gBjzY6UQo4tSoaIPuRkR+VlIEGKRi6gVJDP3d9y8rvrulCQxSgjwjyPJjPqAggDPovHH9dSRy/YBar1Hk+IEi7Tg/1G7YinxEdgZtRxBuUcdC5r//9tfvX/7ww98rg9B4BqRcFD4AC5DUDaFLcQUIlei4y+Xacn7o0mjHedxVJFSw8a2I83X2/zf82s4R8/LF96AXP5qFATiDiAQBJf7y7QfPr13zKRfbqE0oBw643nrL9ZHzBnzJC6Bc12yQhJ0H1Btdx53+7PeujyKipoPIfPfjD9+//PHHClspTWBga4lzmKwn5QUfK6BseoCQPFTX8RDWjNZ1AwyjgIDrgDOiZbDtXMgx2Cq8xAjx4MXLcg8gajoDGx2Lk8vprI9EcHktAdXDop02eQwRMHP18BadHxUxeO1E2g07OWMBk0CFaw6Yv7/4m4nmBemQaKgYJqZ6BWAgL6eg+gXnLe9N5bxrxgzOsVjE4Lhzp8Aucr7huoF9RU+TZMo+RsgIBtJRAYgpDikVEzXCOw962wgE14fOLQ2DDwsCBNl2vWCf686dLIIDTsRWMWIjGRBJTYROUg8rDIi88yHnfFte3hOhLW+bVt5boQVp283suc/Zjmsxso/7eJrPQIIQxJsBiur3RW4pI/XuhA56NQxQWyGD7dC2sotMAWVjiOtABHG139dnAAMbPSXK1xt7RIiJuQEuqhnMhyJFDBZDOWI3pfAQyUWPSNUNRIMZ2OjpThYjXpxBKHTCq3vi552h+UIG2z+dyGG6qckpEOL2+ZDhpjOA2DiVJg+IhHw/5/ah0Lw6AvjZQgYARrXDTSm3VAJoBHfu80EQzWdAHpNMHhTK8ih0RzGELW1AmJ8vjIkFOoAhUZbNYAfyozeQgXSjTXh6VMALCoNboRt7jFrrGcezGRPMkTix3ydhGMNAwhAWkeIC3js/+atAANEhm0WRNLmWpermYCA1VyLKhOc9eKIaO2jbCcmJMkmTq1yEZi4G5OJbNjny3imOgmXsYDHrCnpp8pvEgFyLd97KOkNRalhON12ubJos7CtNNpwBeQKCEgfmt25VxSCXJgv7S5ONYNBCq3+MTuPspOjNZoFt8236NOCV3Euqaml/abIBDOiTp9UPeaRjHHtHO+LtSMi5qIvgxE4otKOETv00udZPsmkqg5aT3dqnjDPT/4hqBnoj5AQIX+shCJEWspxVKa7wFkbqFaktdz+p7YNcmsqAPk0e+Knp/DGv1AninVDkYNsJHCqeKb1bzoX5+RvOrTyDgjSZ8dT6yVbNtYOzRY/7ZP65kJ8V5XwRakQpbfDmRF4jJQVUlCGVKyBNmszYx8cvmp+BreV0t/Zp88wE51zInXTvCRFCJJg92IF3fnthcXF7cXFhQQqbW1tkjx3JDvTTZOZojZ9p1FwGtsJnizOTJGFWxX5vWzQqn3nslC8sRSIEDFhFNKpMH4or7BSlyW/OPd8aqRJmSdG227dve6NST+FfPxP965fIDuwQfXX79qtoNOcKUppcn2MwmgFJmNXNgyMBKhCwfxyF8Oj/n3+T9EsEgsQrO2wP2G9Hcwy2UB3SZElGMyCXZHGucI7+RroWGbCTiSCCJAg/R8Q73uwLVFRxBYgGkCbX5xAMZyBVTtlEOXqbnG4K7ADSZxyJ3Pj5FxSROomvjlABeyDwvwoD1+tI6WevVyvDGUifuJNrmEI4+Pjj223E4r3zX5O0KITlbDr6Cl54FZVDouu1H/H7baHlZDwDG/0+hITFbEyIRqNK6uj13rm1uH0wVz7kXnBBdoQw2n/BqMgEDGwMQIjgW/PeytR2fctJPqjojX++skbkEfzI6dzaPri3bi0gJ8JsvG5WYBIG5KIDxyOsswSnWBgIoKl6fkaPORjYGHrifZ5jRd+eElm2c6qlXuFQkkkYEAq26anevTU1Ea54cUWFMg0Dm/xJRXur/h9UZSYGRsliYDEgshiYlEFLy/Dw8Mm84LvGvp25GIRh7G/rC1jUqVgukKkYDJcavgpELR9Kt4dMxGB4TwCy6k7BRAwqRPD22/V+Y4uBqRjYTlZE4GTd39dMDCoIio0IiSZjQA6o1OQIU2Oj3tJsDHIHNpxXo9/KrAyaKIuBxYDIYmAxILIYWAyILAYWAyKLgcWAyGJgMSCyGFgMiCwGFgMii4HFgMhiYDEgshhYDIgsBhYDIouBxYDIYrAHg/8DjZt77iOxgJ4AAAAASUVORK5CYII='}}
        />

        </View>
    )

}

export default HomeHeader