let message1: string = 'hello';
message1 = 'hii';
let age1: number = 20;
let isActive: boolean = false;

let arrayy: number[] = [1, 2, 3, 4, 5];
let data: any = 'this could be of any type';
data = 42;

let object1: { name: string; age: number; location: string } = {
  name: 'Pavit',
  age: 23,
  location: 'Bathinda',
};
object1.location = 'Chandigarh';

function demo(a: number, b: number) {
  return a + b;
}
const demoFn: number = demo(2, 4);

console.log(
  `message1 : ${message1} , age1:${age1}, isActive : ${isActive} , arrayy:${arrayy} , data:${data}, demoFn : ${demoFn} , object = ${object1}`
);
