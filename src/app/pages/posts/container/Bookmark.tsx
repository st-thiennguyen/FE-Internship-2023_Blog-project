import { useDispatch, useSelector } from 'react-redux';
import PostItem from '../../../shared/components/PostItem';
import { fetchBookmark } from '../../detail-post/detail-post.actions';
import { useSearchParams } from 'react-router-dom';
import { RootState } from '../../../stores/store';
import { useEffect } from 'react';

// const data = [
//   {
//     id: 111,
//     userId: 125,
//     postId: 368,
//     createdAt: '2023-09-26T04:55:47.258Z',
//     updatedAt: '2023-09-26T04:55:47.258Z',
//     post: {
//       id: 368,
//       title: 'The most failed JavaScript interview questions',
//       description:
//         'Try yourself and read the explanation.\nTrue story — you don’t need to know JavaScript well to pass any JavaScript interview.',
//       content:
//         '<p>If you do interviews as a JavaScript developer from time to time, then you know that the questions in such interviews are always similar (more or less, okay!). Under different phrases, interviewers test you for knowledge of the same topics. And despite this, as you will see, the statistics of correct answers to such questions is quite low.</p><p>How to change the situation? Piece of cake — to do as many exercises as possible across these topics — and most importantly, to understand the result. Start with the ones we have selected for this article.</p><p>Below we give typical interview questions broken down by topic and the percentage of correct answers from our telegram channel. To give you more insight regarding these numbers, we should note that stats for other quizzes from our channel show a high level of JavaScript proficiency in our audience.</p><p>And now running to the questions.</p><h2>Event loop.</h2><p>It’s hard to imagine a JavaScript interview that doesn’t mention the event loop. And it’s not in vain. The theme is really fundamental and is used daily by every React, Angular, *substitute your framework* developer.</p><p><br></p><p><strong>Quiz №1. 18% of correct answers</strong></p><p>As an example, we have chosen a quiz that seems to cover all aspects of this topic.</p><p><br></p><p><br></p><p><a href="https://t.me/intspirit/566" rel="noopener noreferrer" target="_blank" style="color: inherit;">Try yourself</a>&nbsp;and read the explanation.</p><p><strong>Explanation.</strong></p><p>In the example, we see&nbsp;<code style="background-color: rgb(242, 242, 242);">setTimeout</code>,&nbsp;<code style="background-color: rgb(242, 242, 242);">Promise</code>, and some synchronous code.</p><p>The internal dialogue of a developer who answered this quiz correctly might look like this.</p><ul><li>Given&nbsp;<code style="background-color: rgb(242, 242, 242);">zero</code>&nbsp;delay, will the function we passed to&nbsp;<code style="background-color: rgb(242, 242, 242);">setTimeout</code>&nbsp;be called synchronously or asynchronously?</li><li>Despite the fact that the&nbsp;<code style="background-color: rgb(242, 242, 242);">setTimeout</code>&nbsp;function has&nbsp;<code style="background-color: rgb(242, 242, 242);">zero</code>&nbsp;delay, the callback function is called asynchronously. The engine will place the callback function in the&nbsp;<em>callback queue</em>&nbsp;(<em>macrotask</em>&nbsp;<em>queue</em>) and move it to the&nbsp;<em>call stack</em>&nbsp;when it is empty. Therefore, the number&nbsp;<code style="background-color: rgb(242, 242, 242);">1</code>&nbsp;will be skipped and number&nbsp;<code style="background-color: rgb(242, 242, 242);">2</code>&nbsp;will be displayed first in the console.</li><li>Will the function we passed as an argument to the&nbsp;<code style="background-color: rgb(242, 242, 242);">Promise</code>&nbsp;constructor be called synchronously or asynchronously?</li><li>The function that the&nbsp;<code style="background-color: rgb(242, 242, 242);">Promise</code>&nbsp;constructor takes as an argument is executed synchronously. Therefore, the next number to be displayed in the console is&nbsp;<code style="background-color: rgb(242, 242, 242);">3</code>.</li><li>Given&nbsp;<code style="background-color: rgb(242, 242, 242);">zero</code>&nbsp;delay, will the function we passed as an argument to the&nbsp;<code style="background-color: rgb(242, 242, 242);">promise’s</code>&nbsp;<code style="background-color: rgb(242, 242, 242);">then</code>&nbsp;handler be called synchronously or asynchronously?</li><li>The callback in the&nbsp;<code style="background-color: rgb(242, 242, 242);">then</code>&nbsp;method is executed asynchronously, even though the&nbsp;<code style="background-color: rgb(242, 242, 242);">promise</code>&nbsp;resolves without delay. The difference with&nbsp;<code style="background-color: rgb(242, 242, 242);">setTimeout</code>&nbsp;is that the engine will place the&nbsp;<code style="background-color: rgb(242, 242, 242);">promise</code>&nbsp;callback in another queue — the&nbsp;<em>job queue</em>&nbsp;(<em>microtask queue</em>), where it will wait for its turn to be executed. Therefore, the next number that enters the console is&nbsp;<code style="background-color: rgb(242, 242, 242);">5</code>.</li><li>What has more priority —&nbsp;<em>microtask</em>&nbsp;queue or&nbsp;<em>macrotask</em>&nbsp;queue or in other words —&nbsp;<code style="background-color: rgb(242, 242, 242);">promises</code>&nbsp;or&nbsp;<code style="background-color: rgb(242, 242, 242);">setTimeout</code>?</li><li><em>Microtasks</em>&nbsp;(<code style="background-color: rgb(242, 242, 242);">promises</code>) have a higher priority than&nbsp;<em>macrotasks</em>&nbsp;(<code style="background-color: rgb(242, 242, 242);">setTimeout</code>), so the next number in the console will be&nbsp;<code style="background-color: rgb(242, 242, 242);">4</code>&nbsp;and the last —&nbsp;<code style="background-color: rgb(242, 242, 242);">1</code>.</li></ul><p>Analyzing the responses, we can conclude that the majority of respondents were mistaken in their assumption that the executor function, which was passed to the&nbsp;<code style="background-color: rgb(242, 242, 242);">Promise</code>&nbsp;constructor as an argument, is called asynchronously (44% voted for this option).</p><p>It was the simplest challenge that can be found in an interview on the Event Loop topic. In another blog post, we give examples of more complex challenges that even experienced seniors cannot cope with:</p><h2><a href="https://intspirit.medium.com/understanding-the-browsers-event-loop-for-building-high-performance-web-applications-part-1-fe4b573a1520?source=post_page-----849664e5bee--------------------------------" rel="noopener noreferrer" target="_blank" style="color: inherit;">Understanding the browser’s Event Loop for building high-performance web applications. Part 1.</a></h2><p><a href="https://intspirit.medium.com/understanding-the-browsers-event-loop-for-building-high-performance-web-applications-part-1-fe4b573a1520?source=post_page-----849664e5bee--------------------------------" rel="noopener noreferrer" target="_blank" style="color: inherit;">The most common interview question and the essential base for writing an efficient code.</a></p><p><a href="https://intspirit.medium.com/understanding-the-browsers-event-loop-for-building-high-performance-web-applications-part-1-fe4b573a1520?source=post_page-----849664e5bee--------------------------------" rel="noopener noreferrer" target="_blank" style="color: inherit;">intspirit.medium.com</a></p><p><br></p><h2>Context.</h2><p>Questions about context can catch up even experienced developers. For example, only 29% of developers solved this knotty but essentially simple task.</p><p><br></p><p><strong>Quiz №1. 29% of correct answers</strong></p><p><br></p><p><br></p><p><a href="https://t.me/intspirit/561" rel="noopener noreferrer" target="_blank" style="color: inherit;">Try yourself</a>&nbsp;and read the explanation.</p><p><strong>Explanation.</strong></p><p>The value of&nbsp;<code style="background-color: rgb(242, 242, 242);">this</code>&nbsp;is set at the time the function is called.</p><p>In the example, the&nbsp;<code style="background-color: rgb(242, 242, 242);">obj.foo</code>&nbsp;function is passed as an argument to another&nbsp;<code style="background-color: rgb(242, 242, 242);">callFoo</code>&nbsp;function, which calls it without context.</p><p>In normal mode, when there is no execution context and the code is running in the browser environment,&nbsp;<code style="background-color: rgb(242, 242, 242);">this</code>&nbsp;refers to the&nbsp;<code style="background-color: rgb(242, 242, 242);">window</code>&nbsp;object, in strict mode it is&nbsp;<code style="background-color: rgb(242, 242, 242);">undefined</code>.</p><p>The correct answer is&nbsp;<code style="background-color: rgb(242, 242, 242);">undefined</code>.</p><p><strong>Quiz №2. 28% of correct answers</strong></p><p>Another common interview question is the value of&nbsp;<code style="background-color: rgb(242, 242, 242);">this</code>&nbsp;inside an arrow function.</p><p><br></p><p><br></p><p><a href="https://t.me/intspirit/488" rel="noopener noreferrer" target="_blank" style="color: inherit;">Try yourself</a>&nbsp;and read the explanation.</p><p><strong>Explanation.</strong></p><p>Arrow functions don’t have their own&nbsp;<code style="background-color: rgb(242, 242, 242);">this</code>. Instead&nbsp;<code style="background-color: rgb(242, 242, 242);">this</code>&nbsp;inside an arrow function’s body points to the&nbsp;<code style="background-color: rgb(242, 242, 242);">this</code>&nbsp;value into the scope the arrow function is defined within.</p><p>Our function is defined in the global scope.</p><p><code style="background-color: rgb(242, 242, 242);">this</code>&nbsp;in global scope refers to the&nbsp;<code style="background-color: rgb(242, 242, 242);">global</code>&nbsp;object (even in strict mode). Therefore the answer is&nbsp;<code style="background-color: rgb(242, 242, 242);">10</code>.</p><h2>Arrow functions.</h2><p>An experienced interviewer (aka devil) might ask about arrow functions in a different context as well. For example, only 28% answered the following question.</p><p><br></p><p><strong>Quiz №1. 28% of correct answers</strong></p><p><br></p><p><br></p><p><a href="https://t.me/intspirit/492" rel="noopener noreferrer" target="_blank" style="color: inherit;">Try yourself</a>&nbsp;and read the explanation.</p><p><strong>Explanation.</strong></p><p>Arrow functions do not have their own&nbsp;<code style="background-color: rgb(242, 242, 242);">arguments</code>&nbsp;object. Instead, the&nbsp;<code style="background-color: rgb(242, 242, 242);">arguments</code>&nbsp;is a reference to the&nbsp;<code style="background-color: rgb(242, 242, 242);">arguments</code>&nbsp;of the enclosing scope.</p><p>Therefore&nbsp;<code style="background-color: rgb(242, 242, 242);">arguments[0]</code>&nbsp;refers to the&nbsp;<code style="background-color: rgb(242, 242, 242);">coef</code>&nbsp;argument and the result of the quiz is&nbsp;<code style="background-color: rgb(242, 242, 242);">0.2</code>.</p><p><strong>Quiz №2. 39% of correct answers</strong></p><p>Another question about arrow functions may look the following way.</p><p><br></p><p><br></p><p><a href="https://t.me/intspirit/490" rel="noopener noreferrer" target="_blank" style="color: inherit;">Try yourself</a>&nbsp;and read the explanation.</p><p><strong>Explanation.</strong></p><p>Arrow functions cannot be used as constructors and will throw an error when called with&nbsp;<code style="background-color: rgb(242, 242, 242);">new</code>. They also do not have a&nbsp;<code style="background-color: rgb(242, 242, 242);">prototype</code>&nbsp;property:</p><p><code style="background-color: rgb(242, 242, 242);">TypeError: Cannot set properties of undefined (setting ‘getNum’)</code></p><p>Such questions are rare, but you should be ready for them. View more information about arrow functions on&nbsp;<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions" rel="noopener noreferrer" target="_blank" style="color: inherit;">MDN</a>.</p><h2>Variable scope.</h2><p>A topic is worth exploring not only because of the popularity across the interviews, but also for practical reasons. If you understand variable scope well, you’ll save a lot of time from debugging code.</p><p><br></p><p>Let’s look at some common examples.</p><p><strong>Quiz №1. 38% of correct answers</strong></p><p><br></p><p><br></p><p><a href="https://t.me/intspirit/457" rel="noopener noreferrer" target="_blank" style="color: inherit;">Try yourself</a>&nbsp;and read the explanation.</p><p><strong>Explanation.</strong></p><p>The place in the scope before the&nbsp;<code style="background-color: rgb(242, 242, 242);">let</code>&nbsp;/&nbsp;<code style="background-color: rgb(242, 242, 242);">const</code>&nbsp;variable’s definition is called a&nbsp;<em>temporary dead zone</em>.</p><p>If we try to access&nbsp;<code style="background-color: rgb(242, 242, 242);">let</code>&nbsp;/&nbsp;<code style="background-color: rgb(242, 242, 242);">const</code>&nbsp;variables before they are defined, a reference error will be thrown.</p><p>To easily remember how a language works, it’s helpful to understand why it works the way it does (so simple, ha?!).</p><p>This behavior was chosen because of the&nbsp;<code style="background-color: rgb(242, 242, 242);">const</code>&nbsp;variables. When accessing a&nbsp;<code style="background-color: rgb(242, 242, 242);">var</code>&nbsp;variable before it is defined, we get&nbsp;<code style="background-color: rgb(242, 242, 242);">undefined</code>. This would be unacceptable for&nbsp;<code style="background-color: rgb(242, 242, 242);">const</code>&nbsp;variables, because then it would not be a&nbsp;<em>constant</em>.</p><p>The behavior for&nbsp;<code style="background-color: rgb(242, 242, 242);">let</code>&nbsp;variables was done in an analogous way so that you can easily switch between these two types of variables.</p><p>Returning to our example.</p><p>Because the function call is above the definition of the&nbsp;<code style="background-color: rgb(242, 242, 242);">bar</code>&nbsp;variable, the variable is in a temporary dead zone.</p><p>The code throws an error:</p><p><code style="background-color: rgb(242, 242, 242);">ReferenceError: Cannot access ‘bar’ before initialization</code></p><p><strong>Quiz №2. 33% of correct answers</strong></p><p><br></p><p><br></p><p><a href="https://t.me/intspirit/365" rel="noopener noreferrer" target="_blank" style="color: inherit;">Try yourself</a>&nbsp;and read the explanation.</p><p><strong>Explanation.</strong></p><p>In&nbsp;<em>named function expressions</em>, the&nbsp;<code style="background-color: rgb(242, 242, 242);">name</code>&nbsp;is local only to the function body and is not available from outside. So&nbsp;<code style="background-color: rgb(242, 242, 242);">foo</code>&nbsp;doesn’t exist in the global scope.</p><p>The&nbsp;<code style="background-color: rgb(242, 242, 242);">typeof</code>&nbsp;operator returns&nbsp;<code style="background-color: rgb(242, 242, 242);">undefined</code>&nbsp;for not defined variables.</p><p><strong>Quiz №3. 36% of correct answers</strong></p><p>The following example is not recommended for use in real life, but you should know how this code will work at least in order to satisfy the interest of the interviewer.</p><p><br></p><p><br></p><p><a href="https://t.me/intspirit/352" rel="noopener noreferrer" target="_blank" style="color: inherit;">Try yourself</a>&nbsp;and read the explanation.</p><p><strong>Explanation.</strong></p><p>For a function that has&nbsp;<em>complex</em>&nbsp;parameters (destructuring, default values), the list of parameters is enclosed in its own scope.</p><p>Therefore, creating the&nbsp;<code style="background-color: rgb(242, 242, 242);">bar</code>&nbsp;variable in the function body does not affect the variable of the same name in the parameter list, and the&nbsp;<code style="background-color: rgb(242, 242, 242);">getBar()</code>&nbsp;function gets&nbsp;<code style="background-color: rgb(242, 242, 242);">bar</code>&nbsp;from its parameters via a closure.</p><p>Generally speaking, we have noticed despite the fact that ES6 has been released for more than 7 years ago, its features remain poorly understood by developers. Of course, everyone knows the syntax of features in this release, but only a few understand it deeper.</p><p>Don’t miss our next article on ES6 features.</p><h2>ES6 modules.</h2><p>If you are an interviewer and for some reason you don’t like the candidate, the modules will definitely help you to fail anybody.</p><p><br></p><p>For the purposes of this article, we have chosen one of the easiest tasks on this topic. But trust us, ES6 modules are way more complex.</p><p>We have collected 13 quizzes on the topic of modules that cover all the most complex and little-known aspects of this topic. If you can correctly answer (and explain your answer to) at least half of these quizzes, you are already a superhero. Check yourself:</p><h2><a href="https://javascript.plainenglish.io/50-shades-of-es6-modules-95cd0b016156?source=post_page-----849664e5bee--------------------------------" rel="noopener noreferrer" target="_blank" style="color: inherit;">50 shades of ES6 modules</a></h2><p><a href="https://javascript.plainenglish.io/50-shades-of-es6-modules-95cd0b016156?source=post_page-----849664e5bee--------------------------------" rel="noopener noreferrer" target="_blank" style="color: inherit;">The toughest challenges of the hardest JavaScript topic for developers.</a></p><p><a href="https://javascript.plainenglish.io/50-shades-of-es6-modules-95cd0b016156?source=post_page-----849664e5bee--------------------------------" rel="noopener noreferrer" target="_blank" style="color: inherit;">javascript.plainenglish.io</a></p><p><br></p><p><strong>Quiz №1. 41% of correct answers</strong></p><p><br></p><p><br></p><p>index.js</p><p><br></p><p>helper.js</p><p>T<a href="https://t.me/intspirit/447" rel="noopener noreferrer" target="_blank" style="color: inherit;">ry yourself</a></p><p>&nbsp;and read the explanation.</p><p><strong>Explanation.</strong></p><p>Imports are&nbsp;<em>hoisted</em>.</p><p><em>Hoisting</em>&nbsp;is a mechanism in JS where variables and function declarations are moved to the top of their scope before the code is executed.</p><p>All dependencies will be loaded before the code runs.</p><p>So, the answer is:&nbsp;<code style="background-color: rgb(242, 242, 242);">helper.js index.js 3</code></p><h2>Hoisting.</h2><p>Another popular interview topic is hoisting.</p><p><br></p><p><strong>Quiz №1. 40% of correct answers</strong></p><p>Despite the fact that the chosen quiz is out of touch with reality, it perfectly explains the mechanism of hoisting. If you understand how this code works, you shouldn’t have any problems with almost all other hoisting questions.</p><p><br></p><p><br></p><p><a href="https://t.me/intspirit/559" rel="noopener noreferrer" target="_blank" style="color: inherit;">Try yourself</a>&nbsp;and read the explanation.</p><p><strong>Explanation.</strong></p><p>Function and variable declarations are placed at the top of their scope, and the initialization of variables occurs at the time of script execution.</p><p>Repeated declarations of a variable with the same name are skipped.</p><p>Functions are always hoisted first. In whatever order the declarations of a function and a variable with the same name occur in your code, the function takes precedence, because it rises higher.</p><p><strong>Example 1.</strong></p><p><code style="background-color: rgb(242, 242, 242);">function num() {}</code></p><p><code style="background-color: rgb(242, 242, 242);">var num;</code></p><p><code style="background-color: rgb(242, 242, 242);">console.log(typeof num); // function</code></p><p><strong>Example 2.</strong></p><p><code style="background-color: rgb(242, 242, 242);">var num;</code></p><p><code style="background-color: rgb(242, 242, 242);">function num() {}</code></p><p><code style="background-color: rgb(242, 242, 242);">console.log(typeof num); // function</code></p><p>Variables are always initialized at the very end.</p><p><code style="background-color: rgb(242, 242, 242);">var num = 8;</code></p><p><code style="background-color: rgb(242, 242, 242);">function num() {}</code></p><p>will be transformed into:</p><p><code style="background-color: rgb(242, 242, 242);">function num() {}</code></p><p><code style="background-color: rgb(242, 242, 242);">var num; // repeated declaration is ignored</code></p><p><code style="background-color: rgb(242, 242, 242);">num = 8;</code></p><p>As a result,&nbsp;<code style="background-color: rgb(242, 242, 242);">num = 8</code>.</p><p><strong>Quiz №2. 12% of correct answers</strong></p><p>Do you remember we said that modules are hard? Modules plus hosting can blow the mind of any programmer.</p><p><br></p><p><br></p><p>index.mjs</p><p><br></p><p>module.mjs</p><p>T<a href="https://t.me/intspirit/463" rel="noopener noreferrer" target="_blank" style="color: inherit;">ry yourself</a></p><p>&nbsp;and read the explanation.</p><p><strong>Explanation.</strong></p><p><code style="background-color: rgb(242, 242, 242);">export default function foo() {}</code></p><p>is equal to</p><p><code style="background-color: rgb(242, 242, 242);">function foo() {}</code></p><p><code style="background-color: rgb(242, 242, 242);">export { foo as default }</code></p><p>And it’s time to remember that functions are hoisted and variable initialization always happens after the function/variable declaration.</p><p>After the engine is processed the module code you can imagine it in the following form:</p><p><code style="background-color: rgb(242, 242, 242);">function foo() {}</code></p><p><code style="background-color: rgb(242, 242, 242);">foo = 25;</code></p><p><code style="background-color: rgb(242, 242, 242);">export { foo as default }</code></p><p>So the correct answer is number.</p><h2>Promises</h2><p>Surprisingly, programmers know the topic of promises better than they think. Interview questions on this topic are usually the most fundamental and most part can handle them. But we still could not bypass it, because neither do the interviewers.</p><p><br></p><p><strong>Quiz №1. 46% of correct answers</strong></p><p><br></p><p><br></p><p><a href="https://t.me/intspirit/569" rel="noopener noreferrer" target="_blank" style="color: inherit;">Try yourself</a>&nbsp;and read the explanation.</p><p><strong>Explanation.</strong></p><p>Let’s see how this code will be executed step by step.</p><p>1. The first&nbsp;<code style="background-color: rgb(242, 242, 242);">then</code>&nbsp;handler throws an error (means — returns&nbsp;<code style="background-color: rgb(242, 242, 242);">rejected</code>&nbsp;<code style="background-color: rgb(242, 242, 242);">promise</code>).</p><p>2. The next&nbsp;<code style="background-color: rgb(242, 242, 242);">then</code>&nbsp;handler does not fire because an error was thrown, instead execution moves on to the next&nbsp;<code style="background-color: rgb(242, 242, 242);">catch</code>.</p><p>3. The&nbsp;<code style="background-color: rgb(242, 242, 242);">catch</code>&nbsp;handler prints an error and returns an empty&nbsp;<code style="background-color: rgb(242, 242, 242);">promise</code>. The&nbsp;<code style="background-color: rgb(242, 242, 242);">catch</code>&nbsp;handler, like the&nbsp;<code style="background-color: rgb(242, 242, 242);">then</code>&nbsp;handler, always returns a&nbsp;<code style="background-color: rgb(242, 242, 242);">promise</code>.</p><p>4. Because the&nbsp;<code style="background-color: rgb(242, 242, 242);">catch</code>&nbsp;handler returned a&nbsp;<code style="background-color: rgb(242, 242, 242);">promise</code>, the next&nbsp;<code style="background-color: rgb(242, 242, 242);">then</code>&nbsp;handler is called and returns a&nbsp;<code style="background-color: rgb(242, 242, 242);">promise</code>&nbsp;with a value of&nbsp;<code style="background-color: rgb(242, 242, 242);">2</code>.</p><p>5. The last&nbsp;<code style="background-color: rgb(242, 242, 242);">then</code>&nbsp;handler is called and prints&nbsp;<code style="background-color: rgb(242, 242, 242);">2</code>.</p><p><strong>In conclusion.</strong></p><p>As always, we want to encourage you to keep learning the language you write every day and&nbsp;<strong>let’s make IT better</strong>!</p>',
//       status: 'public',
//       tags: ['ReactJs', 'InterviewTips'],
//       userId: 115,
//       likes: 0,
//       comments: 0,
//       cover: 'https://internship-attachments.s3.amazonaws.com/cover-post/abc.webp',
//       recommend: false,
//       deletedAt: null,
//       createdAt: '2023-09-26T03:06:26.527Z',
//       updatedAt: '2023-09-26T04:02:51.720Z',
//       user: {
//         id: 115,
//         email: 'thien.nguyen@gmail.com',
//         firstName: 'Nguyễn',
//         lastName: 'Sĩ Thiện',
//         phone: '0344155696',
//         gender: 'male',
//         dob: '10/03/2023',
//         displayName: 'Nguyễn Sĩ Thiện M',
//         picture: 'https://internship-attachments.s3.amazonaws.com/avatar/0__cmymeRhhYqp-6ua.jpg',
//         isActive: true,
//         isAdmin: false,
//         followers: 1,
//         followings: 0,
//         verifyAt: '2023-09-15T14:07:52.959Z',
//         createdAt: '2023-09-15T14:07:37.233Z',
//         updatedAt: '2023-09-26T02:21:08.733Z',
//       },
//     },
//   },
//   {
//     id: 110,
//     userId: 125,
//     postId: 366,
//     createdAt: '2023-09-26T04:55:22.110Z',
//     updatedAt: '2023-09-26T04:55:22.110Z',
//     post: {
//       id: 366,
//       title: 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
//       description: 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
//       content: '<p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>',
//       status: 'public',
//       tags: ['sdf'],
//       userId: 55,
//       likes: 0,
//       comments: 0,
//       cover:
//         'https://internship-attachments.s3.amazonaws.com/cover-post/7ea524864ee97be1177d2d30c3a0deaf--hue-vietnam.jpg',
//       recommend: false,
//       deletedAt: null,
//       createdAt: '2023-09-26T03:02:24.986Z',
//       updatedAt: '2023-09-26T04:31:55.376Z',
//       user: {
//         id: 55,
//         email: 'truong.le@classmethod.vn',
//         firstName: 'Lê',
//         lastName: 'Trường',
//         phone: '0332380616',
//         gender: 'male',
//         dob: '02/07/2001',
//         displayName: 'cmvn-truong',
//         picture: 'https://internship-attachments.s3.amazonaws.com/avatar/anh-anime-16.jpg',
//         isActive: true,
//         isAdmin: false,
//         followers: 1,
//         followings: 0,
//         verifyAt: '2023-09-08T09:19:36.406Z',
//         createdAt: '2023-09-08T08:38:38.603Z',
//         updatedAt: '2023-09-26T02:41:37.037Z',
//       },
//     },
//   },
// ];

const Bookmark = () => {
  const handleUpdateBookmark = () => { };
  const dispatch = useDispatch();
  const postListBorkmark = useSelector((state: RootState) => state.bookmark.data)


  useEffect(() => {
    dispatch(fetchBookmark() as any);
  }, [])

  return (
    <section className="section section-bookmark">
      <div className="container">
        <div className="section-header d-flex item-center justify-between">
          <h2 className="section-title">Your Saved Bookmarks</h2>
          <p className="bookmark-count">Total: {postListBorkmark.length}</p>
        </div>
        <ul className="row">
          {postListBorkmark && postListBorkmark.map((bookmarkItem, index) => (
            bookmarkItem.post && <li className="post-item col col-4" key={index}>
              <PostItem post={bookmarkItem.post} onClickBookmark={handleUpdateBookmark} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Bookmark;
