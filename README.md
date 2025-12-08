# Autoři
- Jakub Dvořák (git nick: KoubaFromPucks, UČO: 567772)
- Filip Karásek (git nick: kari217, UČO: 567777)
- Radek Šerejch (git nick: RadekSerejch, UČO: 569018)
- Vojtěch Czakan (git nick: woytteew, UČO: 569013)


# TeamUp
Mnoho lidí zná situaci, kdy se snaží organizovat nějakou sportovní událost, ale při větším počtu lidí je obtížné mít přehled o tom, kdy kdo může, kolik má platit a podobně. Proto vznikla aplikace TeamUp, která s tímto organizováním pomáhá.

## Popis
Aplikace se zaměřuje na vytváření a správu událostí. Díky ní je možné snáze organizovat, primárně sportovní, události. 

Uživatel je schopen vytvořit událost. Na tuto událost může rozeslat pozvánky. Na pozvánky je možné odpovědět. V případě kladné odpovědi má pak organizátor přehled o tom, kolik lidí se na akci chystá a pomocí aplikace vypočítat konečnou cenu pro každého uživatele.

Každý uživatel může být součástí více týmů, které slouží jako logická skupina uživatelů. Díky tomuto seskupení je možné poslat pozvánku na akci snadno několika lidem.

Pro každou událost je vytvořena nástěnka, která slouží pro předávání informací směrem od (splou)organizátora k pozvaným uživatelům na konkrétní událost.

Aplikace by měla umožňovat filtrovat akce podle data, názvu. Neukazovat akce z minulosti, na kterých jsem nebyl. Uživatel vidí svoji historii (ne)navštívených akcí.

## Specifikace entit
### Události (event, concrete-event)
Buď veřejné nebo soukromé (v rámci týmu/pouze na pozvání) - na události je možné zatrhnout zda přijdu/nepřijdu/nevím.

K událostem je možné přidat místo konání a informace na nástěnku. Toto může dělat jen organizátor události, teoreticky spoluorganizátor. Událost může ještě např explicitně obsahovat informaci, kolik bude stát vstup nebo pronájem sportoviště. Asi by mělo jít rozpočítat cenu ze sportoviště nebo si zvolit vlastní vstupné.

Událost má organizátory a spoluorganizátory, kteří ji spravují. Mohou přidat věci na nástěnku. Každá událost by měla uchovávat informaci o tom, kdo označil, že na událost jde, nejde nebo neví. Zároveň by bylo fajn, kdyby si šlo zobrazit statistku účasti na událostech. 

Události mohou nabývat 2 typů - veřejná/soukromá. Soukromá je pouze na pozvání. 

### Lokace (venue)
Obsahuje inforaci o tom, kde se nachází (GPS/slovně), název, popis, ceník. Lokaci může spravovat pouze její zakladatel.

### Tým
Tým by má název, popis, obrázek, členy a administrátora. V rámci týmu může administrátor přidávat/odebírat lidi. Tým se chová jako skupina lidí - lze na událost pozvat např. celý tým + pár jednotlivců. Při pozvání týmu jsou odeslány pozvánky všem členům zvlášť.

### Uživatel
Uživatel má jméno, přezdívku, mail, obrázek, tel. číslo.
