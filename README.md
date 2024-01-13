# 制作背景

School Notesは、主に小学校の時間割をクラウド上で作成し共有できるアプリです。このアプリを作ろうとおもった背景には、大多数の教員が「週案」と呼ばれる大きな紙の手帳でスケジュールを管理しており、デジタル管理する手段がほぼないことがあります。

## スケジュールをデジタル管理しないことによるデメリット
デメリットはたくさんありますが、
### 変更があると書き直すのが大変
例えば、２時間目と３時間目を入れ替えてたいと思った時、消しゴムで消して書き直します。教科名だけであればそれほど苦ではないかもしれませんが、もしそこに単元名であったりその時間の狙い、単元時数（その単元の何時間目の授業なのか）を書き込んでいれば全て書き直おすことになります。
### 時間割を共有するための作業が煩雑
  当然、次の週のスケジュールが定まったら、関係する先生方や自分のクラスの児童と共有しなければなりません。そのためにわざわざExcelに書き直して印刷します。私が勤務していた学校では学校ホームページにも各クラスの時間割を載せていたので、ExcelをJPEGに変換してアップロードしたりもしていました。
  ちなみに専科の先生などは児童に配る必要がないので、手帳に手書きした時間割をそのままコピーして渡していたりします。ただこの場合、本人以外ほとんど読めないような字で書かれているのでもらった人は謎の暗号を読み解くことになります。
### 印刷された時間割が古く、調整に失敗する
  小学校の授業は全て担任が１人で行うわけではなく、専科の先生に委任したり、TT（Team Teachingの略）、支援員の先生と行なったりします。そのため時間割の調整が必要ですがこの調整が大変です。もちろん、ある程度は時間割を固定していますが、運動会や学習発表会等の行事があったり、出張があったりするとどうしても調整が必要になったりします。そのため、専科やTTの先生などが先に時間割を印刷して配布し、確認してもらうのですが、調整が多くなると空いていたはずの時間が埋まっていて、当てにしていた時間で調整できない、なんてことが起こります。うまくタイミングがあって話して調整できればまだいいのですが、タイミングが合わずに多分大丈夫だろう、とおもって調整できていないことも多々あります。
### データで記録が残らない
  これは教員をしたことのない方にはイメージしずらいかもしれませんが、週案は立てて終わりではありません。例えば、時数計算と言って学期末に教科毎に何時間授業をしたかを計算して進捗を確認しますが、これを手で数えて確認しています。また、授業のねらいや授業中の子供達の様子をメモしたりしますが、考えてみれば授業のねらいなんて全国の先生がほぼ同じねらいで毎年授業しているはずなのに、みなが揃って毎年手書きしているんです。また子供達の授業中の様子なんかも、去年の記録が残っていれば授業の計画を立てる時に大いに参考になるのに、全くそうした情報もなく授業を計画しています。

