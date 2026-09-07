from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from build_reports import setup, table, OUT, LOGO_BW, LOGO, NAVY, GRAY

def build():
    d=setup('Laytime Hesaplama Formu - SNP SKY','SSC-OPS-LT-01-SKY')
    s=d.sections[0]; s.top_margin=Inches(.42); s.bottom_margin=Inches(.72); s.left_margin=Inches(.62); s.right_margin=Inches(.62)
    d.styles['Normal'].font.size=Pt(8.0); d.styles['Normal'].paragraph_format.space_after=Pt(1.5)
    logo=LOGO_BW if LOGO_BW.exists() else LOGO
    if logo.exists():
        p=d.add_paragraph(); p.alignment=WD_ALIGN_PARAGRAPH.CENTER; p.paragraph_format.space_after=Pt(0); p.add_run().add_picture(str(logo),width=Inches(.72))
    p=d.add_paragraph(); p.alignment=WD_ALIGN_PARAGRAPH.CENTER; p.paragraph_format.space_after=Pt(0)
    r=p.add_run('LAYTIME HESAPLAMA FORMU | SNP SKY'); r.bold=True; r.font.name='Arial'; r.font.size=Pt(16); r.font.color.rgb=RGBColor.from_string(NAVY)
    p=d.add_paragraph(); p.alignment=WD_ALIGN_PARAGRAPH.CENTER; p.paragraph_format.space_after=Pt(3)
    r=p.add_run('KURGUSAL EĞİTİM SENARYOSU • SİYAH-BEYAZ BASKI'); r.bold=True; r.font.name='Arial'; r.font.size=Pt(7.2); r.font.color.rgb=RGBColor.from_string(GRAY)
    table(d,['SEFER / SÖZLEŞME','DEĞER','SEFER / SÖZLEŞME','DEĞER'],[
      ('Gemi','SNP SKY','Sefer / C/P tarihi','SKY-2026/08 | 20.07.2026'),('Yükleme limanı','Hamburg, Almanya','Tahliye limanı','Bilbao, İspanya'),('Yük / Miktar','Çelik rulo / 7.200 MT','Operasyon','Tahliye'),('Laytime şartı','WWD, SHEX EIU','Reversible','Hayır')],[1760,2920,1760,2920],font=7.2)
    p=d.add_paragraph('1. SÖZLEŞMESEL GİRDİLER'); p.style='Heading 2'; p.paragraph_format.space_before=Pt(1); p.paragraph_format.space_after=Pt(1)
    table(d,['GİRDİ','DEĞER','HESAP / AÇIKLAMA'],[
      ('Yük miktarı (Q)','7.200 MT','Konşimento miktarı'),('Tahliye oranı (R)','2.400 MT/gün','C/P günlük tahliye oranı'),('İzin verilen laytime','3 gün / 72 saat','7.200 ÷ 2.400 = 3 gün'),('Demurrage oranı','8.400 USD/gün','Saatlik oran: 8.400 ÷ 24 = 350 USD'),('Dispatch / Despatch oranı','4.200 USD/gün','Saatlik oran: 175 USD; bu örnekte uygulanmaz')],[3000,2500,3860],font=7.2)
    p=d.add_paragraph('2. NOR VE LAYTIME BAŞLANGICI'); p.style='Heading 2'; p.paragraph_format.space_before=Pt(1); p.paragraph_format.space_after=Pt(1)
    table(d,['OLAY','TARİH','SAAT','NOT'],[
      ('Gemi varışı / All Fast','03.08.2026','01:00','Bilbao terminali'),('NOR tendered','02.08.2026','20:00','Geçerli NOR'),('NOR accepted','02.08.2026','22:00','Acente / terminal teyidi'),('Laytime başlangıcı','03.08.2026','08:00','C/P notice time sonrası'),('Tahliye tamamlandı','06.08.2026','20:30','Hortumlar/ekipman ayrıldı')],[2800,1700,1400,3460],font=7.0)
    p=d.add_paragraph('3. TIME SHEET — SAYILAN / SAYILMAYAN SÜRELER'); p.style='Heading 2'; p.paragraph_format.space_before=Pt(1); p.paragraph_format.space_after=Pt(1)
    table(d,['BAŞLANGIÇ','BİTİŞ','OLAY / NEDEN','TOPLAM','SAYILAN %','LAYTIME'],[
      ('03.08 08:00','04.08 08:00','Tahliye operasyonu','24,0 sa','100','24,0 sa'),('04.08 08:00','04.08 14:00','Şiddetli yağmur - WWD istisnası','6,0 sa','0','0,0 sa'),('04.08 14:00','05.08 14:00','Tahliye operasyonu','24,0 sa','100','24,0 sa'),('05.08 14:00','06.08 14:00','Tahliye operasyonu','24,0 sa','100','24,0 sa'),('06.08 14:00','06.08 20:30','Tahliye ve final survey','6,5 sa','100','6,5 sa')],[1500,1500,2760,1200,1100,1300],font=6.45)
    p=d.add_paragraph('4. SONUÇ HESABI'); p.style='Heading 2'; p.paragraph_format.space_before=Pt(1); p.paragraph_format.space_after=Pt(1)
    table(d,['HESAP KALEMİ','FORMÜL','SONUÇ'],[
      ('Kullanılan net laytime','24 + 0 + 24 + 24 + 6,5','78,5 saat'),('Süre farkı','78,5 − 72,0','+6,5 saat'),('Demurrage','6,5 saat × 350 USD/saat','2.275 USD'),('Dispatch / Despatch','Kullanılan süre izin verileni aştı','Uygulanmaz')],[2600,4400,2360],font=7.0)
    p=d.add_paragraph(); p.paragraph_format.space_before=Pt(0); p.paragraph_format.space_after=Pt(1)
    r=p.add_run('Kontrol Notu: '); r.bold=True
    p.add_run('Bu kayıt yalnızca eğitim için hazırlanmış kurgusal bir örnektir. Gerçek SNP SKY seferi, C/P hükmü veya şirket alacağı değildir. Nihai hesapta imzalı NOR, SOF, time sheet ve Charter Party hükümleri esas alınır.')
    table(d,['HAZIRLAYAN','MASTER / GEMİ ONAYI','OPERATION / CHARTERING ONAYI'],[('Eyüp Miraç OY\nTarih / İmza: __________','Ad Soyad / İmza:\n________________','Ad Soyad / İmza:\n________________')],[3000,3000,3360],font=7.0)
    path=OUT/'SNP_SKY_Laytime_Hesaplama_Doldurulmus_Ornek.docx'; d.save(path); print(path)

if __name__=='__main__': build()
