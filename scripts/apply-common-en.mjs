import fs from 'fs';
import path from 'path';

const dir = path.join(import.meta.dirname, '..', 'src/pages/en/services/sofia');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('-repair.astro'));

/** Longest-first replacement pairs (BG -> EN). */
const pairs = [
  ['РотоРем извършва ремонт на перални по домовете в София и населени места около града. Обслужваме различни райони на столицата, включително Младост, Люлин, Дружба, Лозенец, Овча купел, Красно село, Борово, Манастирски ливади, Надежда, Студентски град и други части на София.', 'RotoRem repairs washing machines at customers\' homes in Sofia and nearby areas. We serve districts across the capital, including Mladost, Lyulin, Druzhba, Lozenets, Ovcha kupel, Krasno selo, Borovo, Manastirski livadi, Nadezhda, Studentski grad, and other parts of Sofia.'],
  ['РотоРем извършва ремонт на сушилни по домовете в София и населени места около града. Обслужваме различни райони на столицата, включително Младост, Люлин, Дружба, Лозенец, Овча kupel, Красно село, Борово, Манастирски ливади, Надежда, Студентски град и други части на София.', 'RotoRem repairs dryers at customers\' homes in Sofia and nearby areas. We serve districts across the capital, including Mladost, Lyulin, Druzhba, Lozenets, Ovcha kupel, Krasno selo, Borovo, Manastirski livadi, Nadezhda, Studentski grad, and other parts of Sofia.'],
  ['Отзиви от клиенти на РотоРем', 'RotoRem customer reviews'],
  ['Често задавани въпроси', 'Frequently asked questions'],
  ['Посещение и диагностика', 'Visit and diagnostics'],
  ['Обадете се за посещение', 'Call to book a visit'],
  ['Сервиз на адрес в София', 'In-home service in Sofia'],
  ['След диагностика', 'After diagnostics'],
  ['След уточняване', 'Upon agreement'],
  ['Свързан проблем', 'Related issue'],
  ['Част или система', 'Part or system'],
  ['Установена причина:', 'Diagnosis:'],
  ['Извършен ремонт:', 'Repair:'],
  ['Свързвате се с РотоРем', 'Contact RotoRem'],
  ['Уговаряме посещение', 'We schedule a visit'],
  ['Ремонт и тест', 'Repair and test'],
  ['Получавате информация за ремонта', 'You receive repair details'],
  ['Какво проверяваме при диагностиката', 'What we check during diagnostics'],
  ['Крайната цена зависи от установената повреда, необходимата работа и използваните резервни части.', 'The final price depends on the fault found, the work required, and the spare parts used.'],
  ['При обаждане е добре да бъдат посочени марката, моделът и начинът, по който се проявява проблемът.', 'When you call, please share the brand, model, and how the problem shows up.'],
  ['Първо се установява причината за конкретната неизправност и след това се определя необходимият ремонт.', 'We first find the cause of the specific fault, then determine the repair needed.'],
  ['Не е необходимо всяка повреда да води до смяна на част. В много случаи диагностиката показва друг проблем в системата, затова конкретният ремонт се определя след проверка.', 'Not every fault requires replacing a part. Often diagnostics points to another issue in the system, so the exact repair is decided after inspection.'],
  ['Техник посещава посочения адрес.', 'A technician visits the address you provide.'],
  ['Телефон', 'Phone'],
  ['Телефон:', 'Phone:'],
  ['Услуга', 'Service'],
  ['Цена', 'Price'],
  ['Проблем:', 'Issue:'],
  ['Район:', 'Area:'],
  ['Ремонт на битова техника в София', 'appliance repair in Sofia'],
  ['Диагностика на адрес:', 'On-site diagnostics:'],
  ['Диагностика:', 'Diagnostics:'],
  ['РотоРем', 'RotoRem'],
  ['| На адрес |', '| At Your Home |'],
];

for (const file of files) {
  const fp = path.join(dir, file);
  let c = fs.readFileSync(fp, 'utf8');
  for (const [bg, en] of pairs) {
    if (c.includes(bg)) c = c.split(bg).join(en);
  }
  fs.writeFileSync(fp, c, 'utf8');
  console.log('patched', file);
}
