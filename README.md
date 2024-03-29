# 制作背景

School Notesは、主に小学校の時間割をクラウド上で作成し共有できるアプリです。このアプリを作ろうとおもった背景には、大多数の教員が「週案」と呼ばれる大きな紙の手帳でスケジュールを管理しており、デジタル管理する手段がほぼないことがあります。デジタル管理をしていないことで、「変更があると書き直すのが大変」、「時間割を共有する作業が複雑になる」などのデメリットが生じている一方、学校のスケジュール作成は時間割という独自の枠組みで考えるので、google calendarやoutlookといった汎用的なアプリで管理するのは難しいと感じていました。このような課題を解決したいとおもいこのアプリを作りました。

※ 制作背景など、現場視点でどう考えてアプリを作成したかについて以下のQiita記事に詳しく書いています。よろしければご覧ください。
https://qiita.com/ast345/items/0ab3347a8442554613c0

![share_cloud](https://github.com/ast345/school-notes/assets/96422491/a7725bfc-7705-40c8-89a6-0813b5bd27ee)

## サイトURL
https://schoolnotes.net/

ゲストログインを利用できます。

 ![スクリーンショット 2024-01-18 19 32 24](https://github.com/ast345/school-notes/assets/96422491/e1ccfc66-f787-44ff-9e48-a0e217021001)

## ER図
![school_notes drawio_page-0001](https://github.com/ast345/school-notes/assets/96422491/23cac161-4dac-46ee-a0d4-9b10d4e4c90d)

[こちらからも確認できます](https://viewer.diagrams.net/?tags=%7B%7D&highlight=000000&edit=_blank&layers=1&nav=1&title=school_notes.drawio#R7Z1tV9u4Esc%2FDS%2FZ4%2Bc4LwuUbgvd7bb07rZvOIa4iUtip44DpJ%2F%2BOg9yHkZxpMSWbGl69t4DJthG%2Bks%2FaWY0c2Zfjl7fpcF48DHphcMzy%2Bi9ntlXZ5blG37%2B%2F%2FMLs%2BUFz%2BksL%2FTTqLe8ZK4vfIl%2Bh6uLxurqNOqFk60PZkkyzKLx9sXHJI7Dx2zrWpCmycv2x34kw%2B2njoN%2BCC58eQyG8Oq%2FUS8bLK9atu2tf%2FBnGPUH5NGe6yx%2FMgrIp1d%2FymQQ9JKXjUv22zP7Mk2SbPnV6PUyHM4bjzTM8veu9%2Fy0eLM0jDOWX5he9MY33988Da7%2FeX33If7r98iMzs3V2z4Hw%2BnqT%2F46CdPVG2cz0g75y4%2FnX2bBw%2FzSxSQL0mzVXbaRX8g7IAuiOP9V%2B8pcfD8cBuNJtPj48sogGvZug1kyzciNyHcXP6LXsPd52Vvzz%2BYdd5vfbP7t%2FOY%2F8pt%2FWb3M%2FMfBMOrH%2BdeP%2BZ8%2Bf%2BJFGk7yd7kNJtnqE4NsNFx9%2BTKIsvDLOHic%2F%2FZLrtLF84bDy2SYpIu%2FzvaMoGt2Vg%2FauP5j8W%2Fx56bJU7jxE%2Buq4xnzV4O9sOqY5zDNwteNS6teeRcmozBLZ%2FlHVj%2B17ZVCVmPEJIp5WSvOdFbXBhtiK6QVrFTeL%2B5dPO5zPiqCuJ83XfE8yzv8vA7lcfbO04Jh3vhxkIUXyTTuTTbFl3%2Bx8ZeuLy0kySNPF8izXJqf5yPsYpCk0e%2B5IIcrAW3KdfH9SzQaBnE%2BdIPezqWLZDFXGTsqiZM4BLKef6iXJuO7IO2H2erCOInibNFE7kX%2BX95ol8Yf7pmbv%2Btl%2Fr25%2Fj7%2Fb%2F7xNJdcnCssHz7ze4S5il%2FCuZIvsmS8uukw%2FEHun656ZP71Q5JlyWj1zYbmoSrLR%2F9hrc62NXBImrta2VTmlki4FeEBRXy62auJvAWyKBiuB8FiopqTIlj3IKWbqQ2%2F1dibvbA7PSV5e%2F4YLub6QdTrhfHhCYm1w1zmDtvoIY%2BzgyhTB%2BfdREwNHUiuOPo1Dd%2F3JMuB0Gn52YtJ3tNR3L9d%2Fqa3oxe3KXp53e7djQ73K5UPy91EyMdHsjCRZWc1VRtZKMKjL3pqI0sXKOJaI7L4zB12gAWci1LOuwmYGsgjN4SQ70IRKkdIhQ8qxyuH5W4ilGMC5SBUZG5XfNlQIQJgUYSYiSTsReR%2B9RKFwxCiPFFsoIJwFETDpjOlEeLQjSHQIosMkckQ05Bt87I4rKCqQYS9u1Q3eFnQ8jkOJpOXJG383qQR%2BtDMwOXaiA2p2JDuKiGeaPUpQbSOlDh34VohDkahvoTg0IZuhPCQEFIJweryqI8QHW0I4TH3jvKEgJ7PcZo8R72SsC%2F1KcGuD90o0UVKSKVEVzYliNI1oESXuXdUp4QHXZnTSZieZ7OxzpsJdoFohgnLgvF4d2HwOMBgcrHB5OTkBAnY7Vp%2FuBAgNNWYR4aT%2B%2B72Ex0o%2BW5TRIpRf3WubtaTwEkB5bwT5IkRGjDuT6OI8vWQwDVP8UyMKa9IMfsXQQVsqlEQ0%2B2ESAhDANkIc1xc%2BRGEoYlPLGFsC2hCo8jy9ZBAwlg2jAScn7e9x%2Fjy4wSjIWAwPrBhWxiagVYwYDQOELQxQnDdFjBEsBdNxsNgdq93EAiPSvRDigNDBdP500ICgnw%2BHiT9JA6Gt8miy%2Bfd8TPMstkKIME0S7Y7K4x7b%2Bb5V%2FJv337%2BHabJXfL3QjP5D66j4RaF1h9cympxceNDsJNXC4RJMk0fw5I%2FjbjbMkKjg9N%2B2NtKCAPlkYbDIIuew60XqXxKt13odDu5T5gae6vj8o%2FcJR%2BDeAY67vg%2BKSzUBzvFtpvWKWYTOmVE6495E5Hl%2Bfot3q6vntJjFuswqqHHVr%2F6ab6E3HQ6bLs5Ou7OvLn8o1a%2FVf2caXdhWMThLmiKWIRIwfdkDV4%2FeL3uz86ta78ff3v%2F7mI0cAfnHRc7jHQYtYGcbrP6C0anCuivvH3T2X%2Fz3%2F%2FDJd9%2BK7op%2F%2Bbqdes7si9uUT97lqx%2Bvk2vpsNs9vmdcZM89UP%2F183LuFii4bjc10CyumuSfrnxH4zLX73r26fOl%2F%2BNvv7%2B55zYsrG79jRQ5d1FXwD5ne0FkG%2FWtgCi%2FpmUsNCm9LLwpTC1geThlPo6nZZMs7XsOJk7zRM0ek2juz18u47Y4dttxE52f2c3YwyTPUNDxrBJsiljr5X1WlfaAte4ufnyMn7%2BL5v8Hk1fs3f3v1%2Bez%2BHEi6DcVrU0Uk5%2FpYnx8eHlY%2FzUG1sPb%2F788u%2Fnc4o1vKmkrN2wQ2sf4qEQ313P39JoEo963%2By%2FU2vy6eb7y93DuQPnRCF2ggM9UbNjg9pd1PaxK2fYniWNvxN57hs7S5rlq9ZnkqVkTvryOEiS4eUwmEyASlp8CmHnxIFhuEb444zjxIFhmFcXl2UKPP7EQYcYmA6eN%2BB0nRLTv7PzvA701DYkfb3Nk7lJ62Adjgid9Tiv%2FJDB7iasOs8hJXlTKw4Z0GIu%2BIOq1uOAK0jH5uyi8nALlrsJmRP2Jq6%2FkiyISmJAxSvm9WzvIHcrVRDT7YRICI%2BxsceA1ocVysJDbOCnTTm7Jv1kAUPoZ1VzxFFH12gcOD6Ij%2BVuIqYEytG1fhr0WhnzKV4enAg5IeaT5XZC9ILn1JqAEGpyYbEMoZxO04Ygxx1NU5Qg8GjaY6nhTH2C8B9E04ggPjRpbJhbFcz90mirq%2Bs7bCAxdyOl2ayu7naSF9elCL0h51lsH1pYcG1zqtXVZ8%2BQ2JTULrYP7SQ6WV199qOsyq9ufGgpQavrKYrRb8FDQvYQKxVumfmxIj2fi92FthONrK7FMECq2CTUcHfP3IJ8Ls1QiIYUgWYWpIh4ikhP2mJ3YbiaThQ5qmSPohSBUWLZ0nymOUe4S%2FfowxHHhufZERu1Y6OwcUrjhmPvL9ukGCQKjSMk8raARm0CibbWZBCvEv0wYcCDno08zVTxef0in5eMPDWLX83%2FtGC28YEVDGuZGmrI3ya9B22PtQcdU94BwtI33%2FSMTx9%2B5jNF%2BZLtrM3u8B9GYBvBGXCHG4t%2FZxR3%2BMVVx6iq7IlF1mVF9V2TcY7v8s3xhCD29vO6lFjghlTmsT2MFq%2FeHe5VUumEd9Fx4rzU0konFZkTPAwXL9qCTFfoDq9IMSU7CzWzBtsdaL9GrJxqkeLHCs0dLhYrnTZmn69ohuiwR%2FyrzxQYEDxZbntam31evEq044ijaUZJx2DNpNw0%2B4ZjtySXoLQeKw6CNaXHDLhWe1d6OhTtUdUez%2Bj6lAm9yiK89vb5jO6RdaeFuCQwKU7l9qj1CG%2FP8QzH0Dopznoc4N7BMTApTrWK0dDTjW6Oyu1RR2BF%2BvEMx4BuDn0Ca9fDAKnikEX4pkVqcUR9ETKldXAtj070Y4mJ2XGawBLphzQc02IXgmokMdmtHuqTBJ7a0jy9Go88VAbI6Hw2mca3%2F%2F199cH%2B9WSZ45fbD6QIVAMDMuus%2BVA4Kg4byMnKTEKNjof3Px%2F%2BvAnex3%2B%2FfrgcWEPrPjlvT8mHyosjUTuNWjiw%2BkoCJ7IZ7vMWc%2FL9BINthTo3TId101%2Fq3ThNDRbc6%2BGS%2FVSvQjHEWuRVsODeTSevQjEOcNXukCkAvQoVKUblhfyexsF0HdVbgvixIt%2BrQKkupZFXwcJ0Heu2gPEry32H1v4EDoVoSBEY6YIUEU8R%2Bf4ESvEnnSjCnm9FfYrAcBVyWkJvjrBrRD%2BOuDDpk3hD9cqvILA4seOscCktmwcod0tQUpQC21HD8m8CxW7BfSxj50a7FtI9VXP3pxehP8fceY63%2Bn6t0OUdK9YrzFWFeq35bA%2B9%2F%2F3t7u%2Fuli3co9dTZWa6VonO4K%2FvDCvTYxwOlSmW9NwGlt9MJjkOw576OVzkljTZSeHis5ZXrNGp5KD1r3qnUjHEWuRUcqD1TyenkoPmv3VbQPMfOpVOUYx%2B2zgHzYHVmwP5sSLfqeRwVCpTzRjooDFw3RbQGLgVyqa3SZBDKRqyBEZBIkvEs0S%2Ba4kIUkuWsLsClWeJC%2BMflzWpsKYIn1K0Y4lHSRbflHMrsH9ZjfEuqQJ72BhvNCttk0upX7sssX1XVvGBZoe23LMW2aEblkvcpCVvoo1Z3%2F3D2PhHQqJqEAYu%2Biq3S69HG%2FOij0QCHtIF%2BVz1QqDUpNXILr0eByev%2B8q6iH%2Fdt3s3AfB2KVVp0S59imI4U7EeryCm2wmRkAUkhFg50ZZwBFbcCnYcJ2KFw%2B%2BtmC1hPQjQluBSatQuMifpnc%2BbRyIq5%2FO%2B%2FOf829dPpvln%2Buba%2Fffhz9%2FfR5NzyipkEqbcG9Z2BU55RtA1O3DDuj9wyrrqeFVtWDvuzoa1Q9mX0IzRZbWvWAFCFQGuI07ZnpaOq0YGTVHfGK4h1Nyalo4ArRYR1JaASwitt6UnqkVlpwS1aTBZ%2FClb0mpQIjJQivrGHPFy7d2OlsofOQJD5Uo3FQ1hSBOUoR0zKKesF5vQBLehNW5DXfvIbWglB3joQsCaAJVvRK1KKh8LXT5Y0F2u01ZUy4oAdJMEdJfjZvQEvWi3srCxMEDl21F%2BoEjfj5Kapaqn8SkfA8gTG9q4pxN9QqxPlYd%2B%2BIDGcMSHcHyIPKtDlwE0amuED%2FYyQMrjA9q1dSpMdqo8tMMHSdqkeJ2SMhfp5iGe0t2r%2BDM89C6DR6pU7DJqnBxJmX24zzqy%2Boxa6AZu7s4sbzifCB%2FS%2FKt%2BtmgVeKXp%2FN4QCG2u3tvR7FNxdzcSzTTh5OxVOjez3K3aqZmqGRM9Dewr%2B9JVAbfoTGc36WDHdcSt8Oly4Dig1975oXwkcK3vlZwUyFpWqfPU1IJx31%2BGt5%2Biu%2BjX%2BC9%2FfB%2Fe%2F2U5Jokzqju1qevsDH%2FL3Tk7VV3S0NLCeBuD%2Fd08e88qYejXOFIqaShtbth3gHv%2FQe19R7srAELH212F0A5wUyMR3LqAQNnq4%2FrgqPVB%2BRBsZFAC%2FZVhkFIrghKqWSXYR2V%2FU3OVALcOy6CEFtgBWaIShAvmdbt7lTpzR11oEQUhS%2BSwRGQ8Al0AcLsp3aFUC0tK5a8XS6hNQbZCmx6l8DW7f0iSJ11xcqpmVMYJfQLE7FJsfNnZGG9vdqN4EKbRQueDoLfQMH1%2FWxGEREY1UF%2BZMveoCaHyQaMVhOhCgEGyO9msH7UE0am60Q5ElGJMCCKZG51CGPIg08bMVNXMFBxJyZUnDIyjncZR1tq8VMIFoh9KoImsVa7Y0gn8cFlUEobTkAgrStGKt89hrJSbdMclGrqLOBWOs9kXVnUuUXM3R1jXYD2c7deFcp6CFVqv7jiWdBzlDZriB6XUq2iFH5Q73L18EGh1GoLeFHC3p%2FXh7FP1ovLxCGrbdDrID%2FbDdBXxQ6Tvk97rMHxCutm5jsN0pZJHfJx34J5isiiWc78sf9V872cjZKIdNVys8d4AjEj3XrocR%2FMVg0gxAhAiLgzlD%2BeGqdZaloUrRD9%2BYGR%2FA%2Fgh3zPpalHLvXwIIEBcuBvt5Q%2FUGB1YvH1%2F22CgZRPQQau3JhQdxIamIzqOCptUEh0edIT1gtl98uP%2BJQyfNCYId4SkPgTxoM%2FsKn%2Fg%2BywclZPkDGMpjo6lMHfOl7PHUtR2vNxDI2blsRTF2GpPLIUHjZgaxVJ4aMcsmgLaMTGW4gS96LewQKtm5VtTfqBID67w9DVqemjULJoCGjUfwmES9%2FOZe6K5a4xDJvpBBO2bDYCI9NCKjr7mTQ%2FNm4UKaOZNnT1jHNrQjhwdaNdEcggnh%2Fygik4bj3tXFLPL3l3KowOaNdEzxicRlQlym15Nh9ns8zvjJnnqh%2F6vm5fxOVxtXM6PAdyGwXPePXdRyZ4VHWQnOsjsow8bV%2BEgo8oB1xOn%2BMdKR1gj3WPUN4aLCTW9Y6UjQKvlBLUl4GpCa9%2FYiWrRbmUBXauIEvataTUoEekYo74xh3u0vfvSUvkjR6BvdLjcXdxnZduLhrCkCQrRjh1YJU4%2BO0T6w6hv3MbacNXMDEcl6leSHSQhn47esBOloR00TGjLRGqIpoZQXxj9lTlsmIpxw2TvLuXBAY2YuvnCTpWIygCZpF9u%2FAfj8lfv%2Bvap8%2BV%2Fo6%2B%2F%2F6H4wm7DySSJ%2F82VU06Ss1Z5wWqqag6S5zqs%2Fiy7ChhQuxT9WexLgtLJpHTANNK1RX3jlrq2uAdv6WDQqjACtSXUdm2JVovKVRKoTYOuLfYoCQFUEenlor4x9HJJT60rjipHObqUpAp0dG1l1n3fQ7jwi0Y7uKDvq1FbFpFuMOobt9ENVs0koWW9arpqoRtsMb7bbM8UrRHtQIL%2BsGaRRKhrjP7KbXSNVTNPHOcaUxMm0Ag6SuIyH4fyFOH3iumDEauL1JBJDZFpd%2Bk%2BE0MXSBCpIyTObbh4zAbTcKI1Jjj0oR8mPMSETEz4sjFh7S8rqRomjkp5pyQmLGitfgl7seaY4M51pxEmbMSERExYpnRMONpg4qg822piAkbM5LuJVHNMcOfV1ggT%2B20OiAkBmHCkY8LUBhMGc%2B8ojwnon%2FqRzvSGBLs6tIOEud%2FigJAQAImObEiYvi6QIFJHSJybMCBuEmTTVGtMcOhDP0zstzggJkSc%2BZOOCVcbTDjMvaM8JuChnMlU8ygndnVoBwnyl27oIp0%2FLCRzfT7lDpJ%2BEgfD22TR4fPO%2BBlm2WzFiGCaJdtdtSDImzRd9OXbz0u1LC5eR0OCmTDurT8yCuLZ8trGJ2DvEttIMk0fw5I%2Fyl5ZGDPCmn0fJNXAw14%2FLNVFGg6DLHoOt96j%2BogjGKF4F47G%2BaPDZUaGcqDvwLuF2Rh28pQHlmFY7hlHnnLvuro85V1ntc0iQKfMChZtGJu%2BW5dA4AFuXONVt8az2T0T%2BxM7UCVh16YI6GHSKLODXd26r6SDjlj37dxNROAiXPdhbocT9FKyEqxWP0y3EyEgjlquWrPluOwO%2FGzxYBYpOltqC4CHQW4a5Xew0fRcNAU0PWerfcn9cLExWaV6yO%2BCrOHXDy9rjrc6NERQJMwCWdOQfUxXNmscjkPbihmvi8GAoHEsoIJ%2BGvTC%2B8n04Wf%2B5i0ATCN0oh9QOArBIlAEAMW0pBOFw1aqGlEwAr9oCmgfHYdplOjMkUri7xXlCJ7mlYsNVzo2tDnO6%2BBx3qIpoKWz5VUzhEtEP1RAo%2Bh2sMaioHw5Ts5aFbHRrOgMEoW%2FIofrsxaRt%2Fikt3qea2w%2Fr0NLPNGQoC6SOgl3w0eVsy8f7u0p%2BuFCm2orYkO4Kz6VDwKtioLRmwKaVVWKDRGuF%2B0qhLloXmXfJ9cGFOn1PlxoUr2%2BacGB9YomiKOsqmoChZLXZCcgpJ2eOuFK0Q8lME4VUSIcJdKre7gw2vT6qQUOuoomiKNMr2qiBJpe21I2qhH60A4gHrRqfEzSOO%2BaN49Z9Bxl%2B0%2B6tt%2FmGrqmY5CbMtlcL6zqbK6FzbOgCKvN1a2LIx40beBy4kRTp8cujKaYOr2WFjiuBhfFIMDlhKd2iWPhetFveYFFjivfn%2FIDRbqp0%2BMwUyi2OfWOqmysJk2glSJYbTLu42AUNh0pjRCJfgjBUsYNQIh0E6cHA8S0QchRJYyVRAgJU9sKLc10Jgd36WJ9yNHB0sUNIIf8gsUdDqumYujosHeX8uiARs2Wn0oQLhH9CALNV%2BRUAnrJ5HjJXN9hw0l9XrIOBt1U7iXrsFtAmuIl60BzlkZesg4G3RRNAS1U6CU7QS%2FaLTP8%2FRVokB918UO6U8yHFs1WJISsZj7w0ahJmoLY1jeLTDwOkmSoVB5I4bLRDiMdDheJ1lzhsHfyc0W6p8yH04nk%2BUOcuZP96IbqUPGh8wODLXhFoh1CfIzXawBC5LvMfH0D9nwM2CuaAlo40WXGJxHtCNK1gGaIy%2Bwq%2F9%2F7LByVE2WHHoucWOgrY1KZWWRz407jVZuzrIvJTio3dhZjjL3KOqMOaltQdOFJIo2cZV1MdlI0BdxhoLPsBL1ot8Awjf2FuBEgdQGEkklacPl1A25JNXKXFapHhORtAfel6DCrQDjasaSLkXyVmzv52cK6Sa1vc8JRrFUxa2cXw%2FiKpoBhfA%2FhMIn7%2BdQ90dxnxiET7SBiGtDkiRQRThHTlI0R0%2BCwdSrGkfUgQJCYBjR2ot%2BMUyQaYmR%2FCZxF8ZvbMHjOe%2BouKlmI4GmzEz1oNlFDc46bmSZHQJ%2FW6wuuqah9FWhMU%2BsSNOtxgEsM04R7DnSjnaIYldcbxs3Nl5fx83%2FZ5Pdo%2Bpq9u%2F%2F98ny%2Bv9IIMqQ2hog8dEbtdThtqOlEK5O8XvygtgQ0VKAD7WTRqIyQPXzF4L7KLZ9HUEX6kTPThBYvyTOIOMunicF967aA0X3DpdnqPiuzWzWEKs1QiYYcwZPLTeCI%2FHNnxRtoCRI8vbzWATR1oguNUyQqc%2BT7y%2FD2U3QX%2FRr%2F5Y%2Fvw%2Fu%2FLMc8NztAGGGvH5J9Yj4DD5J%2BEgfDt%2BurF%2Bn8dUKCh%2FVnbpOFJuZ98zPMstkKK8E0S7Z7bgGdN2m66O63n5eCWly8joaETGHcW39kFMSz5bWNT0ABEAtdMk0fw7I%2Fe%2Fm5jNAp%2F9YPXq%2F7s3Pr2u%2FH396%2FuxgN3MG5vVqczdukVDhpOAyy6Dnceo1T5vqy195yd75mF0myf3i30L1JG%2FY7Ls8fRmAbwRlweRrGyrEJXZ5Xncpcni5BbhFH48FAGsuguTz9CpYBVGlAKyUuB%2FctB0sZUjrwTvF8UgVRxbKQ%2BsYtrUd3YBpg7C6Lubs2%2BserFPAsdxPAd7Wr0YlWy%2Bt2326u55xql4cstxMgHxsPDsqkCEVoginS0hOE1UwM9lEHCJXkiA3P%2B%2BRNkt0%2F5HuP%2B8dkNFbEASpcONohBdOlsUfVCEAMxREqFjFaEwYBQ1oC8qWfBr3wfjJ9%2BJm%2FOO5XjhGNdnDBwqeN2r%2FQvKNi6dLGEqjVzBJHFQtQEi2Uw0DrvUtbD6mLFol2KCHxeYgOOehwZaPD3G%2F7VAwVRSgqssKE29E0fI4mURLfz8Ig1RcVHCLRjhU2PBkmIUYm%2F8hd8rHiQJnVCmEzUqZsgm9KoAzcCJJImctkNC4n%2B1mromWaFRlDBh%2BhuO1TJgFqMgCrNo5jpDS7xZkVBuwbBwmpAOhefrgLbEVEDHcQbPkg0CpQmi4EGEWpUkyMcL1oFzNN%2BIFAOeroTUVAEZkXgC4DLVLXlY8ApIkFIywX4TBttSsLF4h2%2BHAwjYx4Wog870%2FvdW3g4LBbDVSHgwOXCMHDw9ygHGRREuvLBw6NaMeHjg10If5I5uq85SF781l1lma3nZZmF1qav07mOWfD16yc82etMjM3%2F1Dmjum5a7AWcqzN8uyi5bnOmAK3fUZoYrRomxG6osDVo4zQSsYZeHuN0L2mrwoFBjpzG6FpRkGr2lUiy%2B1ErBJ9RIlMlEg3P3fg4kKjgzMdDG8uYnjhmkLBzLTCZaMdUTx0a7LHyYhAjHSbtQfNl9c3su3Y4hhTDAhkjAe9nOsjNAiYozSjMmCmF73xzfc3T4Prf17ffYj%2F%2Bj0yo3ObkkTiNpxMknhRrKscNmetspbuWEYDyzAs94yjQpd3XV2Frm6nDssoRXPEEmtsP69DiwFujCbxyPAp0cEHBnojLbN73hnup1thmuV2yB4YB1p57eltQU4VYYRwRYpR2Ye%2FR0LQvo9YYY%2F6qgorIq20e4QArSrXN%2FsjANsbC3ZgHCBWbEo02HCx%2FWnBDroZEtGQIxxVopAjtXFEpCl2jxBg3sTrJ9m2WIEcOSpFhaIcgTkqlp6%2B5seONEMh%2BmGEkgJraXkth8kOOKxmG10ZQlQlG2KJD7CoG%2BJACVomRTMWmf45LbFEf8QS24HPY8GYEIniSqci9%2FOBKYB50UNL3kgTZ32LHkptzFbYZLl9iQeGhFYO6D1tARc9S5tsCzbPtbifT5ZMif9Z1VUQ9D8jYo4Koq0KMbQkj4IRA%2F2%2F8mOc6sj8eGBIIGJsSqKwlX12KxV9C4DTDMFoBxiXxBAgTyTxhBJpJJYnLiV24PoGnuhWlCfFCECe5FKAMQArnrTlYEYzhKIyR0bns8k0vv3v76sP9q8nyxy%2F3H4gBSmRIpIoYpoCMUJVAO3gxf56BO2FSJn89UIItSWgSVzLnciJKlGZH37wet2fnVvXfj%2F%2B9v7dxWjgDoqchAgQWQBh9etVARC6BFQsXlIqdr1wQW8K6CMZh2mU6EGJU9WhHyY6iAm5mKCEYwjGxP4sMqphQktHB70poJ%2Bjlz9QY0igT2Nv25BHIiQkQaIoengIEk5dkKBUN1MUEjZ77xyY1ss6gx8Su3cTMe6JfWUTErP75Mf9Sxg%2B6csKDolwsuJ4yTDdTkROQmh3Ep%2B5mqFQ4ujoGon0SZ1sMg%2Bmribx3%2BJzV09%2FpYnx8eHlY%2FzUG1sPb%2F788u%2FntZZ3TwV8KrcatDAhC9uI547oN7s7EfYOc24VtwJc03sVj55XtYQrHTTNzG1CfWXIckXD6EvHg1Y7f3pTQL%2BySolNhOtF6RRu1LbBQ1psbDl8SKsatghNcEJ9Zcq5dI3YoqXzkd4U0PmIaahPl41%2BiMFDWs3avgjNfUJ9ZY4Une01SJcPBuQLJT%2FnYojPTdIaRbmcKhPteEI5kIM8kckTk5JXQixQeJJzKgYUh727VAcKJTNnGPcQJ1wiURknz9%2FSaBKPet%2Fsv1Nr8unm%2B8vdwzmcOi7SMHh685hFz1E2K0fLWat8Zju5s966pkMv4%2FrGNQyHPI6WVQvqjt%2FTtpvLir2KgV8BR6hagBMIrizYSweUDq9GOteobwxdKq3wrXFnXSwdAVpl5aS2BHSMqORZE60WlTN0UpsGelEQJexpnqtBiUhfGvWNoQdFuiutjgzPpQMASQL9Hy3zozVBJNoBBMuYyQeISE8Z9Y2hi0QXfGhZvYyuWujvCFbGqfs4GLXymJ9ojWhHDxNjxuXjQ6hjjP7KHBZNxQBisneX8gSBJs22ng8Xrg39yIG5psSDgpI2XTAoWpBeqqKxr2XhMXpTQPtky4%2BEC5eIfniAOaa0PRJeNvlXdyJ89auf5tBbK870d8In%2FM6OGJZvuvq1GoQADZR34Wg8nKsPA2hkBNC4vsO2iqjkqDpdFBwGS61Xkzw0YjdzNSWEhtg99IyhKQYBrjAtaIbEKJoT9KLdcpPwA4FSoXmCGyjSA2ksWv0EyTOIMItFMQaQJxaMysRYGn6Z6IcRDMdsAEakh9NQ8ulrAxGMxyyaAgZkYkANr0i0Q0hJ0mQkRl3EkB9BY2tDiOPSKipJCEpaRXSM8klEPz7AuJmmuD0PO2hh%2F9fgGJWWK5veX3BLSPyWV9FkPAyU8lzWlC57XRiPO122VRuxOTZ52q%2FcjmAA%2Bx6hKe5ISgbCVrgjucdv%2BXjQKkMQvSlgzIpK7kjhetEuWRAlZyGy5ah02RWxRbpnkpKNULpnUiBbjgp1UZItlByELXNNCkQMd8SLPoihZDFExMjcvkj3WjrQGil5Kqkju2n5YEC%2BODD0pXfATtUQrjRCHgpxJP82TZJs8%2BN5qw0%2BJr1w%2Fon%2FAw%3D%3D)

## インフラ構成図

![school-notesインフラ構成図 drawio](https://github.com/ast345/school-notes/assets/96422491/73dd1d2a-8f03-4d34-a1a7-56f3d336a089)

## 使用技術
・　Ruby  
・　Ruby on Rails  
・　HTML（haml)  
・　css(SCSS)  
・　JavaScript  
・　JQuery  
・　JQuery UI  
・　Postgresql  
・　AWS(EC2, Route53) ※ コスト削減のため、SSL証明書はLet's Encryptを利用しました。  
・　nginx  
・　Unicorn  

## 機能一覧
1. ユーザ認証機能（devise、AzureとgoogleのSSO認証、ゲストログイン機能)  
1. クラス作成機能(CRUD)  
1. 教科書別に単元名を共同管理する機能（CRUD）  
1. 時間割作成機能
    1. 行事予定、各コマの教科・単元、持ち物、業間（朝、昼）の活動、下校時刻の作成(CRUD, Ajax)  
    1. ドラッグ&ドロップによるコマの入れ替え編集（jQuery UI、CRUD, Ajax)  
    1. テンプレートの作成機能(CRUD, Ajax)  
    1. テンプレートから時間割をクローンする機能(CRUD, Ajax)  
    1. フォントサイズの自動調整  
1. 時間割の枠設定機能（曜日、開始時限と終了時限、業間表示の設定）  
1. 共有URL発行機能  
1. フォロー機能  
1. 印刷レイアウト自動調整機能  
1. 時間割画像ダウンロード機能

# 工夫して実装したこと
## 認証機能
　deviseを利用して認証機能を実装しました。
### 登録
　直接アプリに登録する方法と、Microsoft、GoogleのSSOを持ちる方法の２種類を用意しました。  
<img width="593" alt="スクリーンショット 2024-01-20 16 39 55" src="https://github.com/ast345/school-notes/assets/96422491/d5e76a91-70d3-47d2-9eb5-8d7e2d38e8b1">

　また、登録時に、ユーザタイプをteacherとして自動的に登録。将来的に学校の先生以外にも、保護者や児童生徒などが登録できる機能を実装することを想定し、user_typeを登録できるように暫定的にしています。  
　同時にTeacherモデルにも、新しく登録しています。将来的にアバターなどTeacherとしてのプロフィールを細かく登録できるようにするためです。
```ruby
# user.rb
class User < ApplicationRecord
  after_create :create_user_rel

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:azure_activedirectory_v2, :google_oauth2]

  private
  def create_user_rel
    # user_types_idの１は"教員"
    self.user_to_types.create(users_id: self.id, user_types_id: 1)
    @teacher = self.build_teacher(user_id: self.id, display_name: self.name)
    @teacher.save
  end
end
```

　ちなみにTeacherのdisplay_nameは自動的にuser.nameで登録されるようになっていますが、左のメニューバーから変更できるようにしています。ユーザーがTeacherを作成する手間を省くためにこのように実装しました。

![ユーザ名変更](https://github.com/ast345/school-notes/assets/96422491/fc3cf607-0afd-46c9-bad8-8ff0c8040bc5)

   
## クラスの作成
 登録すると、school_class（学級）の作成を促すページに遷移します。このページではクラス情報として学年・学級を登録するだけでなく、担当教科も同時に登録されるようにしました。  
 学年を選択すると、ajaxでその学年の教科と教科書の情報を取得し、選択できるようにしました。
 また、登録ボタンを押した時のリクエストもajaxで送信しています。登録する教科情報もまとめてparamsでschool_classのcreateアクションに渡して、そこで処理しています。
 
 ![クラス登録の様子](https://github.com/ast345/school-notes/assets/96422491/edfa3e69-2109-4b9a-bf15-b6d679b65977)

```javascript
//create_class.js
document.addEventListener('turbolinks:load', () =>{
    const selectGrade = document.getElementById('class_setting_grade')
    const classNameBox = document.getElementById('class_setting_name')

    // 学年が選択された時の処理
    selectGrade.addEventListener('change', function(){
        const selectedGrade = selectGrade.value;
        $('.class_subjects').empty();
        $('.class_setting_submit_btn_box').addClass('hidden');
        $('.class_setting_name_box').removeClass('hidden')

        axios.get(`/grade_subject`, {
            params: {grade_id: selectedGrade}
        })
        .then((res) =>{
            const subjectsDataSets = res.data
            const gradeCount = subjectsDataSets.length
            $('.class_subjects').append($('<h3>', {
                'text' : "担当教科と教科書を選択してください。"
            }))
            var index = 0
            subjectsDataSets.forEach(function(subjectsDataSet){
                var grade = subjectsDataSet.grade_name
                const subjectsData = subjectsDataSet.grade_subjects
                subjectsData.forEach(function(subjectData){
                    var classSettingSubject = $('<div>', {
                        'class': 'class_setting_subject',
                    })
    
                    var subjectBox = $('<div>', {
                        'class': 'subject_box',
                    })
                    if(gradeCount != 1){
                        subjectBox.append($('<input>', {
                            'type': 'checkbox',
                            'checked': false,
                            'value': subjectData.grade_subject_id,
                            'id': `subject_check_box${index}`
                        }));
                    } else {
                        subjectBox.append($('<input>', {
                            'type': 'checkbox',
                            'checked': true,
                            'value': subjectData.grade_subject_id,
                            'id': `subject_check_box${index}`
                        }));
                    }
                    subjectBox.append($('<label>', {
                        text: ` ${subjectData.subject_name}`
                    }));
    
                    
                    var textBooks = subjectData.text_books
                    if(!textBooks.length == 0){
                        var textBookBox = $('<div>', {
                            'class': 'text_book_box',
                        })
                        var textBookSelectBox = ($('<select>', {
                            'class': 'text_book_select',
                        }))
                        textBookSelectBox.append($('<option>', {
                            'value' : ""
                        }))
                        textBooks.forEach(function(textBook){
                            textBookSelectBox.append($('<option>', {
                                'value': textBook.text_book_id,
                                'text': `${textBook.text_book_name}(${textBook.text_book_comp})`
                            }))
                        });
                        textBookBox.append(textBookSelectBox);
                        classSettingSubject.append(subjectBox, textBookBox)
                        $('.class_subjects').append(classSettingSubject);
                    } else {
                        classSettingSubject.append(subjectBox)
                        
                        $('.class_subjects').append(classSettingSubject);
                    }
                    index = index+1
                });
            })
            $('.class_setting_submit_btn_box').removeClass('hidden');

        })
    })

    //　登録ボタンが押された時の処理
    $('.class_setting_submit_btn').on('click', () =>{
        var gradeClass = selectGrade.value;
        var className = classNameBox.value;

        var subjectsDataBox = []
        let emptyTextBookCount = 0;

        $('.class_setting_subject').each(function(index) {
            var subjectCheckBox = document.getElementById(`subject_check_box${index}`)
            var select = $(this).find('select');
            var textbook = select.val();
            var checkbox = $(this).find('input[type="checkbox"]');
            var subject = checkbox.val();

            // チェックボックスの状態を確認
            var isChecked = subjectCheckBox.checked;

            if(isChecked) {
                var subjectData = {
                    grade_subject_id: subject,
                    text_book_id: textbook
                };

                subjectsDataBox.push(subjectData)
                if(textbook === ''){
                    emptyTextBookCount++;
                }
            }
        });

        if(className === ''){
            // 専科（gradeClassが13,14,15)の場合の登録処理
            if( gradeClass == 13 || gradeClass == 14 || gradeClass == 15){
                if(!emptyTextBookCount == 0){
                    window.alert("登録する教科の教科書をすべて選択してください")
                } else {
                    axios.post(`/school_classes`, {
                        school_class: {grade_id: gradeClass},
                        subjects: {subjects_data_set: subjectsDataBox}
                    })
                    .then((res) =>{
                        if(res.status === 200){
                            var schoolClassId = res.data.id
                            window.location.href = `/school_classes/${schoolClassId}`
                        }
                    })
                }
            } else {
                window.alert("クラス名を入力してください")
            }
        } else {
            if(!emptyTextBookCount == 0){
                window.alert("登録する教科の教科書をすべて選択してください")
            } else {
                axios.post(`/school_classes`, {
                    school_class: {grade_id: gradeClass, class_name: className},
                    subjects: {subjects_data_set: subjectsDataBox}
                })
                .then((res) =>{
                    if(res.status === 200){
                        var schoolClassId = res.data.id
                        window.location.href = `/school_classes/${schoolClassId}`
                    }
                })
            }
        };
    })
})
```

## 時間割の作成
### 基本的な作成、編集、削除
時間割の各項目の追加、編集、削除は全てajaxにてリクエストを行い、表示を切り替えています。リクエストがサーバから帰ってきた時に、右上のステータスが「保存済み」になります。

追加の様子
![create2](https://github.com/ast345/school-notes/assets/96422491/efae65b3-6edd-4e9c-b94f-aefd7d7799cc)


編集、コピペ、削除
![editdestroy](https://github.com/ast345/school-notes/assets/96422491/8fe406f4-fa80-47c2-bec6-fb4e17107904)

例えば、一番上の行事予定は以下のようなコードで実装しています。createの際には繰り返し編集が行えるよう、リクエストに使うdatasetの書き換えを行い、observerでその変更を検知できるようにしています。
```javascript
//event.js
export function event(schoolClassId) {
    var statusDisplay = document.getElementById('status_display')

    //行事予定の追加
    $('.event_create_btn').each(function(index, element){
        const Id = element.id
        const dataSet = $(element).data()
        var date = dataSet.date
        var dayOfWeek = dataSet.dayOfWeek
        $(`#${Id}.event_create_btn`).on('click', () =>{
            statusDisplay.innerHTML = "保存中…"
            $(`#${Id}.event_btn_box`).addClass('hidden')
            $(`#${Id}.event_text_box`).removeClass('hidden')

            function createEventEndHandler(event) {
                var clickedElement = event.target;
                var creatingElement = $(`#${Id}.event_box`);
                if(!creatingElement.is(clickedElement) && creatingElement.has(clickedElement).length === 0){
                    var newEvent = $(`#event_text${Id}`).val();
                    var replacedText = newEvent.replace(/\n/g, "<br>");
                    if (!newEvent) {
                        $(`#${Id}.event_btn_box`).removeClass('hidden')
                        $(`#${Id}.event_text_box`).addClass('hidden')
                        document.removeEventListener('click', createEventEndHandler);
                        statusDisplay.innerHTML = "保存済み";
                    } else {
                        $(`#event_display${Id}`).removeClass('hidden')
                        $(`#${Id}.event_text_box`).addClass('hidden')
                        const eventDisplay = document.getElementById(`event_display${Id}`)
                        eventDisplay.innerHTML = `${replacedText}`
                        adjustFontSize(eventDisplay);
                        axios.post(`/school_classes/${schoolClassId}/events`, {
                            event: {date: date, day_of_week: dayOfWeek, event_name: newEvent}
                        })
                        .then((res) =>{
                            if(res.status === 200){
                                eventDisplay.setAttribute('data-event-id', `${res.data.id}`)
                                statusDisplay.innerHTML = "保存済み"
                            }
                        });
                        document.removeEventListener('click', createEventEndHandler);
                    };
                };
            };

            document.addEventListener('click', createEventEndHandler);
        })
    })

    //行事予定の編集
    $(`.event_display`).each(function(index, element){
        const dataSet = $(element).data()
        const Id = dataSet.id
        var eventId = dataSet.eventId
        const eventDisplay = document.getElementById(`event_display${Id}`)

        //datasetが追加されたことを検知して再定義
        var observer = new MutationObserver(function(mutationsList) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-event-id') {
                    eventId = Number(eventDisplay.getAttribute('data-event-id'))
                }
            }
        });

        observer.observe(eventDisplay, { attributes: true})
        
        $(`#event_display${Id}`).on('click', () => {
            statusDisplay.innerHTML = "保存中…"
            $(this).addClass('hidden')
            $(`#${Id}.event_text_box`).removeClass('hidden')

            function editEventEndHandler(event) {
                var clickedElement = event.target;
                var creatingElement = $(`#${Id}.event_box`);
                if(!creatingElement.is(clickedElement) && creatingElement.has(clickedElement).length === 0){
                    var editEvent = $(`#event_text${Id}`).val();
                    var replacedText = editEvent.replace(/\n/g, "<br>");
                    var event = $(`#event_text${Id}`)
                    if (!editEvent) {
                        $(`#${Id}.event_btn_box`).removeClass('hidden')
                        $(`#${Id}.event_text_box`).addClass('hidden')
                        document.removeEventListener('click', editEventEndHandler);
                        axios.delete(`/school_classes/${schoolClassId}/events/${eventId}`)
                        .then((res) =>{
                            if(res.status === 204){
                                statusDisplay.innerHTML = "保存済み"
                            };
                        });
                    } else {
                        $(`#event_display${Id}`).removeClass('hidden')
                        $(`#${Id}.event_text_box`).addClass('hidden')

                        eventDisplay.innerHTML = `${replacedText}`
                        adjustFontSize(eventDisplay);
                        axios.patch(`/school_classes/${schoolClassId}/events/${eventId}`, {
                            event: {event_name: editEvent}
                        })
                        .then((res) =>{
                            if(res.status === 200){
                                statusDisplay.innerHTML = "保存済み"
                            };
                        });
                        document.removeEventListener('click', editEventEndHandler);
                    };

                };

            };

            document.addEventListener('click', editEventEndHandler);
        });
    });


}
```
### ドラッグ&ドロップによるコマの入れ替え
現場でよくあるコマの入れ替えはjQuery UIとajaxを組み合わせて、直感的に行えるようにしました。

![dragdrop](https://github.com/ast345/school-notes/assets/96422491/4f91a2e0-0cfd-488c-a68f-2d96bdd6c8d1)

操作としてはドラッグ元からドラッグ先へ要素を移動させていますが、処理としては、それぞれの要素を書き換える処理を行っています。

```javascript
//dragdropschedule.js
export function dragDropLesson (schoolClassId) {
      $('.lesson_box').draggable({
        revert: 'invalid',
        helper: function (event) {
            // ドラッグ中のヘルパー要素を作成
            var clone = $(this).clone();
            
            // カーソルスタイルを設定
            clone.css('cursor', 'grabbing');
            
            // クローン元のlesson_boxを非表示にする
            $(this).css('visibility', 'hidden');
            return clone;
        },
        zIndex: 2,
        stop: function( event, ui ) {
          $(this).css('visibility', 'visible');
        }
    });
    
    
      $('.lesson_box').droppable({
        accept: '.lesson_box',
        drop: function(event, ui) {
          var sourceBox = $(ui.draggable);
          var targetBox = $(this);

          targetBox.css('z-index', 1);
          // 中身を入れ替えるためのGotLessonクラスを取得
          var targetGotLesson = targetBox.find('.got_lesson');
          var sourceGotLesson = sourceBox.find('.got_lesson');
          var targetGotLessonDom = targetGotLesson[0];
          var sourceGotLessonDom = sourceGotLesson[0];

          // sourceBoxとtargetBoxの中身が新規作成なのか、既存のlessonがあるのかを判別
          var targetHasLesson = !targetGotLesson.hasClass('hidden');
          var sourceHasLesson = !sourceGotLesson.hasClass('hidden');

          // updateリクエストのためのデータセット
          // 要素のデータ属性を data() メソッドを使用して取得
          const targetDataSet = $(targetGotLesson).data();
          const sourceDataSet = $(sourceGotLesson).data();

          // deleteアクションに対応させるためのdelete_lesson_btnを取得
          var targetDeleteLessonBtn = targetBox.find('.delete_lesson_btn');
          var sourceDeleteLessonBtn = sourceBox.find('.delete_lesson_btn');
          var targetDeleteLessonBtnDom = targetDeleteLessonBtn[0];
          var sourceDeleteLessonBtnDom = sourceDeleteLessonBtn[0];

          // copyアクションに対応させるためのcopy_lesson_btnを取得
          var targetCopyLessonBtn = targetBox.find('.copy_lesson_btn');
          var sourceCopyLessonBtn = sourceBox.find('.copy_lesson_btn');
          var targetCopyLessonBtnDom = targetCopyLessonBtn[0];
          var sourceCopyLessonBtnDom = sourceCopyLessonBtn[0];
        
          // 変更前のtargetDataSetの内容
          const targetSubjectName = targetDataSet.subjectName;
          const targetGradeSubjectId = targetDataSet.gradeSubjectId;
          const targetGotUnitId = targetDataSet.gotUnitId;
          const targetLessonId = targetDataSet.lessonId;
          // 変更前のsourceDataSetの内容
          const sourceSubjectName = sourceDataSet.subjectName;
          const sourceGradeSubjectId = sourceDataSet.gradeSubjectId;
          const sourceGotUnitId = sourceDataSet.gotUnitId;
          const sourceLessonId = sourceDataSet.lessonId;

          // 教科名、単元名を取得
          var sourceLessonSubjectText = sourceBox.find('.lesson_subject').text();
          var targetLessonSubjectText = targetBox.find('.lesson_subject').text();
          var sourceLessonUnitText = sourceBox.find('.lesson_unit').text();
          var targetLessonUnitText = targetBox.find('.lesson_unit').text();

          const changeSourceBoxContent = () => {
            // lesson_subjectのテキスト内容を交換
            sourceBox.find('.lesson_subject').text(targetLessonSubjectText);
            sourceBox.find('.lesson_unit').text(targetLessonUnitText);
            var sourceBoxSubject = sourceBox.find('.lesson_subject')[0]
            var sourceBoxUnit = sourceBox.find('.lesson_unit')[0]
            adjustSubjectFZ(sourceBoxSubject);
            adjustUnitFZ(sourceBoxUnit);
            //datasetの入れ替え
            sourceGotLessonDom.setAttribute('data-subject-name', targetSubjectName);
            sourceGotLessonDom.setAttribute('data-grade-subject-id', targetGradeSubjectId);
            sourceGotLessonDom.setAttribute('data-got-unit-id', targetGotUnitId);
            sourceGotLessonDom.setAttribute('data-lesson-id', targetLessonId);

            sourceDeleteLessonBtnDom.setAttribute('data-lesson-id', targetLessonId);

            sourceCopyLessonBtnDom.setAttribute('data-grade-subject-id', targetGradeSubjectId);
            sourceCopyLessonBtnDom.setAttribute('data-got-unit-id', targetGotUnitId);

            // データ属性を更新
            $(sourceGotLesson).data('subjectName', targetSubjectName);
            $(sourceGotLesson).data('gradeSubjectId', targetGradeSubjectId);
            $(sourceGotLesson).data('gotUnitId', targetGotUnitId);
            $(sourceGotLesson).data('lessonId', targetLessonId);
          };

          const changeTargetBoxContent = () => {
            // lesson_subjectのテキスト内容を交換
            targetBox.find('.lesson_subject').text(sourceLessonSubjectText);
            targetBox.find('.lesson_unit').text(sourceLessonUnitText);
            var targetBoxSubject = targetBox.find('.lesson_subject')[0];
            var targetBoxUnit = targetBox.find('.lesson_unit')[0];
            adjustSubjectFZ(targetBoxSubject);
            adjustUnitFZ(targetBoxUnit)

            //datasetの入れ替え
            targetGotLessonDom.setAttribute('data-subject-name', sourceSubjectName);
            targetGotLessonDom.setAttribute('data-grade-subject-id', sourceGradeSubjectId);
            targetGotLessonDom.setAttribute('data-got-unit-id', sourceGotUnitId);
            targetGotLessonDom.setAttribute('data-lesson-id', sourceLessonId);

            targetDeleteLessonBtnDom.setAttribute('data-lesson-id', sourceLessonId);

            targetCopyLessonBtnDom.setAttribute('data-grade-subject-id', sourceGradeSubjectId);
            targetCopyLessonBtnDom.setAttribute('data-got-unit-id', sourceGotUnitId);

            // データ属性を更新
            $(targetGotLesson).data('subjectName', sourceSubjectName);
            $(targetGotLesson).data('gradeSubjectId', sourceGradeSubjectId);
            $(targetGotLesson).data('gotUnitId', sourceGotUnitId);
            $(targetGotLesson).data('lessonId', sourceLessonId);
          };

          var statusDisplay = document.getElementById('status_display');
          statusDisplay.innerHTML = "保存中…"

          if (targetHasLesson && sourceHasLesson) {
            // ドラッグ元、ドロップ先どちらもLessonがある場合
            changeTargetBoxContent();
            changeSourceBoxContent();
            // targetLessonのEdit
            const targetLessonReq = axios.put(`/school_classes/${schoolClassId}/lessons/${targetLessonId}`, {
                lesson: {date: sourceDataSet.date, day_of_week: sourceDataSet.dayOfWeek, period: sourceDataSet.period}
            })
            // sourceLessonのEdit
            const sourceLessonReq = axios.put(`/school_classes/${schoolClassId}/lessons/${sourceLessonId}`, {
                lesson: {date: targetDataSet.date, day_of_week: targetDataSet.dayOfWeek, period: targetDataSet.period}
            })

            Promise.all([targetLessonReq, sourceLessonReq])
            .then((responses) => {
                const [targetLessonResponse, sourceLessonResponse] = responses;

                if (targetLessonResponse.status === 200 && sourceLessonResponse.status === 200) {
                  statusDisplay.innerHTML = "保存済み"
                }
            })
            .catch((error) => {
                window.alert('エラーが発生しました');
            });
          }
          else if (targetHasLesson && !sourceHasLesson) {
            // ドロップ先だけLessonを持っています
            // drop先を新規作成ボタンに変更
            targetBox.find('.got_lesson').addClass('hidden');
            targetBox.find('.new_lesson_menu').removeClass('hidden');
            targetBox.find('.copy_lesson_btn').addClass('hidden');
            targetBox.find('.delete_lesson_btn').addClass('hidden');
            targetBox.addClass('print_grey');


            // drag要素でlessonを表示
            sourceBox.find('.got_lesson').removeClass('hidden');
            sourceBox.find('.new_lesson_menu').addClass('hidden');
            sourceBox.find('.copy_lesson_btn').removeClass('hidden');
            sourceBox.find('.delete_lesson_btn').removeClass('hidden');
            sourceBox.removeClass('print_grey');
            changeSourceBoxContent();
            axios.put(`/school_classes/${schoolClassId}/lessons/${targetLessonId}`, {
                lesson: {date: sourceDataSet.date, day_of_week: sourceDataSet.dayOfWeek, period: sourceDataSet.period}
            })
            .then((res) =>{
                if(res.status === 200){
                  statusDisplay.innerHTML = "保存済み"
                };
            });
          }
          else if (!targetHasLesson && sourceHasLesson) {
            // ドラッグ元だけLesssonを持っています
            // ドラッグ元を新規作成ボタンに変更
            sourceBox.find('.got_lesson').addClass('hidden');
            sourceBox.find('.new_lesson_menu').removeClass('hidden');
            sourceBox.find('.copy_lesson_btn').addClass('hidden');
            sourceBox.find('.delete_lesson_btn').addClass('hidden');
            sourceBox.addClass('print_grey')
            // drop先でlessonを表示
            targetBox.find('.got_lesson').removeClass('hidden');
            targetBox.find('.new_lesson_menu').addClass('hidden');
            targetBox.find('.copy_lesson_btn').removeClass('hidden');
            targetBox.find('.delete_lesson_btn').removeClass('hidden');
            targetBox.removeClass('print_grey')

            changeTargetBoxContent();
            axios.put(`/school_classes/${schoolClassId}/lessons/${sourceLessonId}`, {
                lesson: {date: targetDataSet.date, day_of_week: targetDataSet.dayOfWeek, period: targetDataSet.period}
            })
            .then((res) =>{
                if(res.status === 200){
                  statusDisplay.innerHTML = "保存済み"
                }});
          }
        }
      });
}
```



### ユーザー別に単元名の表示を切り替えている点
担任か専科か、担任でも低学年なのか否かによって、表示する文字を制御しています。modelsでgrade_subject_nameを細かく定義し、それを表示させています。

低学年でひらがな表示
![統合　１・５](https://github.com/ast345/school-notes/assets/96422491/f5649bdf-d2aa-4e6b-b0cf-4465c9cd02e7)

専科は（学年＋教科名）
![image](https://github.com/ast345/school-notes/assets/96422491/ac0a8bb7-dc2f-461d-b9e8-941516a81684)

```ruby
#lesson.rb
class Lesson < ApplicationRecord
    def grade_subject_name(grade_id)
        # 小学校１、２年生
        if grade_id == 1 or grade_id == 2
            grade_subject = self.grade_subject
            grade_subject.subject.yomigana
        # 専科（小学校13、中学校14、高校15)
        elsif grade_id == 13 || grade_id == 14 || grade_id == 15
            grade_subject = self.grade_subject
            grade_name = grade_subject.grade.grade_name.gsub('生', '')
            subject_name = grade_subject.subject.subject_name
            grade_name + subject_name
        #　それ以外
        else
            grade_subject = self.grade_subject
            grade_subject.subject.subject_name
        end
    end
end
```

### フォントサイズの自動調整
教科名や単元名など、長くなった場合に枠をはみ出ないように枠の高さを取得しそこに収まるように調整しています。
```javascript
//school_class.js
    // 教科名のフォントサイズ調整
    function adjustSubjectFZ(element) {
        const $element = $(element);
        const rowHeight = $('.row_lesson').height()/5*2 ;  // 要素の高さを取得
        const originalHTML = $element.html(); // 元のHTMLを保持
        let fontSize = parseInt($element.css('font-size')); // デフォルトのフォントサイズを取得
        let lineHeight = parseInt($element.css('line-height'));
        while (($element[0].scrollHeight > rowHeight || $element[0].getClientRects().length > 1) && fontSize > 1) {
            fontSize -= 1; // フォントサイズを1ずつ減らす（必要に応じて調整可能）
            $element.css({
                'font-size': fontSize + 'px',
                'line-height': lineHeight + 'px',
            });
        }
        $element.html(originalHTML);
    }
```
### テンプレート機能  
教科や持ち物、下校時刻など、毎週変わらない予定は予め設定しておくことで、ワンクリックで作成することができます。

![template](https://github.com/ast345/school-notes/assets/96422491/5cf93bd6-e3bd-4e7d-b071-9509f7e19ebc)

テンプレートの設定自体は、上記の時間割の作成機能と同様の方法で実装しました。  
テンプレートのデータを用いて時間割を作成する機能の実装については以下の通りです。朝活動の作成を例に説明します。  

① 「テンプレートの利用」ボタンを押した時に、ajaxでリクエストを送ります。どの週の時間割かについてparamsで渡しています。
```javascript
    //morning_activity.js
    $('.add_from_temp').on('click', (event) =>{
        const startOfWeek = $(event.currentTarget).data('startOfWeek');
        axios.get(`	/school_classes/${schoolClassId}/template_morning_activities/get_temp`, {
            params: {start_of_week: startOfWeek}
        });
    // 以下省略
```
 ② サーバ側でテンプレートのデータを取得しリクエストを返します。コントローラにget_tempメソッドを定義しそこで処理をかけます。もしテンプレートの利用をクリックする前に作成しているデータがあれば、それを残すために、privateに定義したremove_duplicate_template_morning_actで重複するテンプレのデータを取り除き、曜日も数値として表現し直します。
```ruby
# template_morning_activities_controller.rb
class TemplateMorningActivitiesController < ApplicationController
    before_action :authenticate_user!
    def get_temp
        school_class = SchoolClass.find(params[:school_class_id])
        template_morning_acts = school_class.template_morning_activities
        start_of_week = params[:start_of_week].to_date
        end_of_week = start_of_week.end_of_week
        this_week_morning_acts = school_class.morning_activities.where(date: start_of_week..end_of_week)
        filtered_template_morning_acts = remove_duplicate_template_morning_act(template_morning_acts, this_week_morning_acts)
        dates = (start_of_week..end_of_week).map { |date| [date, date.wday]}
        add_dates_to_template_morning_acts(filtered_template_morning_acts, dates)
        render json: @morning_acts_from_template
    end

    private
    def remove_duplicate_template_morning_act(template_morning_acts, this_week_morning_acts)
        this_week_morning_act_wdays = this_week_morning_acts.map { |lesson| [lesson.day_of_week] }
        template_morning_acts.reject do |template_morning_act|
            this_week_morning_act_wdays.include?([template_morning_act.day_of_week])
        end
    end

    def add_dates_to_template_morning_acts(filtered_template_morning_acts, dates)
        day_mapping = {
            "sunday" => 0,
            "monday" => 1,
            "tuesday" => 2,
            "wednesday" => 3,
            "thursday" => 4,
            "friday" => 5,
            "saturday" => 6
        }
        @morning_acts_from_template = []
        filtered_template_morning_acts.each do |template_morning_act|
          matching_date = dates.find { |date| date[1] == day_mapping[template_morning_act.day_of_week] }
          @morning_acts_from_template << {date: matching_date[0], day_of_week: template_morning_act.day_of_week, activity_name: template_morning_act.activity_name}
        end
    end
end
```
　③ クライアントは受け取ったデータを元にpostリクエストを送り、表示や他のajax処理に利用するdatasetを書き換えています。
 ```javascript
 // morning_activity.js
        // 省略
        axios.get(`	/school_classes/${schoolClassId}/template_morning_activities/get_temp`, {
            params: {start_of_week: startOfWeek}
        })
        .then((res) =>{
            var template_morning_acts = res.data
            template_morning_acts.forEach(function(template_morning_act){
                const date = template_morning_act.date
                const Id = `${date}`
                const dayOfWeek = template_morning_act.day_of_week
                const newMorningAct = template_morning_act.activity_name
                const morningActText = document.getElementById(`morning_act_text${Id}`)
                axios.post(`/school_classes/${schoolClassId}/morning_activities`, {
                    morning_act: {date: date, day_of_week: dayOfWeek, activity_name: newMorningAct}
                })
                .then((res) =>{
                    if(res.status === 200){
                        $(`#morning_act_display${Id}`).removeClass('hidden')
                        $(`#${Id}.morning_act_btn_box`).addClass('hidden')

                        const morningActDisplay = document.getElementById(`morning_act_display${Id}`)
                        morningActDisplay.innerHTML = `${res.data.activity_name}`
                        morningActDisplay.setAttribute('data-morning-activity-id', `${res.data.id}`)
                        morningActText.value = res.data.activity_name
                        adjustFontSize(morningActDisplay);
                    }
                });
            })
        })
 ```
## URL発行
　右上のメニューバーから2種類の共有URLと埋め込みコードを取得できます。埋め込みコードは児童・生徒向け共有URLをiframeにあてはめたものです。

　![image](https://github.com/ast345/school-notes/assets/96422491/a7285974-b47b-4c84-b90e-21f08b6bb42b)

　このURLのpathは以下のようになっており、school_classのidではなく、tokenをurlに利用しています。このtokenを使って、controllerでschool_classを特定するように実装しました。発行順に生成されるidを利用すると、ユーザが簡単に書き換えることができてしまい、セキュリティ上の問題があるとおもい、このような形にしました。
```ruby
# 児童・生徒向け
/school_classes/:token/share(.:format)
# 教員向け
/school_classes/:token/share_teachers(.:format)
```

このtokenは、school_classの作成時に、以下のコードでランダムで生成し、保存しているものです。
```ruby
# school_classes_controller.rb
    def create
        # school_class_paramsから必要なパラメータを取得
        permitted_params = school_class_params
        # トークンを生成してパラメータに追加
        permitted_params[:token] = SecureRandom.hex(20)
        # 新しいschool_classを作成
        @school_class = SchoolClass.new(permitted_params)
        subjects = subjects_params[:subjects_data_set]
        if @school_class.save
            school_class_teacher = @school_class.school_class_teachers.build(teacher: current_user.teacher, teacher_type: "担任")
            if school_class_teacher.save
                subjects.each do |subject|
                    AssignedSubject.create(school_class_teachers_id: school_class_teacher.id, grade_subjects_id: subject[:grade_subject_id])
                    if subject[:text_book_id]
                        UsingText.create(school_class_id: @school_class.id, text_book_id: subject[:text_book_id])
                    end
                end
            end
            render json: @school_class
        else
          render :new
        end
    end
```
## follow機能
　教員向けリンクから時間割にアクセスするとフォローボタンが表示されます。フォローすると、左側のメニューバーからアクセスできるようになります。

 ![image](https://github.com/ast345/school-notes/assets/96422491/68bea8c3-a4db-40a2-b0e0-a0359366e98c)

 ![image](https://github.com/ast345/school-notes/assets/96422491/90b1b00d-4317-4d0a-acb3-2fe1d4b2ec2c)

「ログイン&フォロー」ボタンからログインするとフォローできるようになっています。以下のようにclass_tokenを「new_user_session_with_follow_path」に渡し、リンクを貼っています。
```haml
= link_to "ログイン&フォロー", new_user_session_with_follow_path(class_token: @token), class: "sign_in_btn top_sign_in_btn"
```
その後、sessionのparamsにclass_tokenを渡し、通常のログイン先であるuser_session_pathにリダイレクトします。
```ruby
# get_session_controller.rb
class GetSessionController < ApplicationController
    def sign_in
        session[:follow_class_token] = params[:class_token]
        redirect_to user_session_path
    end
   // sign_upは「登録」ボタン用
    def sign_up
        session[:follow_class_token] = params[:class_token]
        redirect_to new_user_registration_path
    end
end
```
そして、follow_class_tokenがあれば、school_classとteacherの中間テーブルschool_class_teacherに登録し、元のurlにリダイレクトするようにしています。
```ruby
# application_controller.rb
    def after_sign_in_path_for(resource)
      current_teacher = current_user.teacher
      school_class_teacher = SchoolClassTeacher.find_by(teachers_id: current_teacher)
      if session[:follow_class_token]
        school_class = SchoolClass.find_by(token: session[:follow_class_token])
        follow_class_teacher = SchoolClassTeacher.find_by(teachers_id: current_teacher, school_classes_id: school_class.id, teacher_type: "フォロー")
        if !follow_class_teacher == nil
          follow = school_class.school_class_teachers.build(teachers_id: current_teacher.id, school_classes_id: school_class.id, teacher_type: "フォロー")
          if follow.save
            flash[:notice] = "ログインに成功し、フォローしました"
            school_class_share_teacher_path(token: school_class.token)
          else
            flash[:notice] = "ログインに成功しましたが、フォローはできませんでした"
            school_class_share_teacher_path(token: school_class.token)
          end
        else
          flash[:notice] = "すでにフォローしています"
          school_class_share_teacher_path(token: school_class.token)
        end
      else
       #省略
      end
    end
```

## rspecでクラス作成のテスト
簡単にではありますがschool_classモデルに対してrspecでテストコードを書きました。
```ruby
# school_class_spec.rb
require 'rails_helper'

RSpec.describe SchoolClass, type: :model do
  let!(:school_type) do
    SchoolType.create!({
      type_name: "小学校"
    })
  end

  let!(:grade) do
    Grade.create!({
      grade_name: '1年生',
      school_types_id: school_type.id
    })
  end

  context '学年とクラス名が入力されている場合' do

    let!(:school_class) do
      SchoolClass.create({
        grade_id: grade.id,
        class_name: 'rspecクラス',
        token: SecureRandom.hex(20)
      })
    end

    it 'school_classが作成できる' do
      expect(school_class).to be_valid
    end
  end

  context '学年が選択されていない場合' do
    let!(:school_class) do
      SchoolClass.create({
        class_name: 'rspecクラス',
        token: SecureRandom.hex(20)
      })
    end

    it 'school_classを作成できない' do
      expect(school_class.errors.messages[:class_name][0]).to eq(nil)
    end
  end

  context 'クラス名が入力されていない場合' do
    let!(:school_class) do
      SchoolClass.create({
        grade_id: grade.id,
        token: SecureRandom.hex(20)
      })
    end

    it 'school_classを作成できない' do
      expect(school_class.errors.messages[:class_name][0]).to eq('を入力してください')
    end
  end

end
```
