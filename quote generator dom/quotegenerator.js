let btn = document.querySelector('#new-quote');
let quote = document.querySelector('.quote');
let person = document.querySelector('.person');

const quotes = [
    {
        quote: "Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world",
        person: 'Albert Einstein'
    },
    {
        quote: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel",
        person: 'Maya Angelou'
    },
    {
        quote: "Your time is limited, so dont waste it living someone else life",
        person: 'Steve Jobs'
    },
    {
        quote: "Not all of us can do great things. But we can do small things with great love",
        person: 'Mother Teresa'
    },
    {
        quote: "Success is not final, failure is not fatal: it is the courage to continue that counts",
        person: 'Winston Churchill'
    },
    {
        quote: "It always seems impossible until it is done",
        person: 'Nelson Mandela'
    },
    {
        quote: "Be yourself; everyone else is already taken",
        person: 'Oscar Wilde'
    },
    {
        quote: "One child, one teacher, one book, one pen can change the world",
        person: 'Malala Yousafzai'
    },
    {
        quote: "Simplicity is the ultimate sophistication",
        person: ' Leonardo da Vinci'
    },
    {
        quote: "I have learned over the years that when one's mind is made up, this diminishes fear.",
        person: 'Rosa Parks'
    }
];
btn.addEventListener("click", function () {
    let random = Math.floor(Math.random() * quotes.length);
    quote.innerText = quotes[random].quote;
    person.innerText = quotes[random].person;
})