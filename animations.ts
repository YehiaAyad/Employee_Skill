import { animate, animateChild, group, keyframes, query, style, transition, trigger } from "@angular/animations";

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          //opacity:0,
          //transform:'scale(0) translateY(100%)',
        })
      ]),
      group([
      query(':enter',[
      animate('2000ms ease', keyframes([
      style({transform:'scale(0) translateX(100%)',offset:0}),
      style({transform:'scale(0.5) translateX(25%)',offset:0.3}),
      style({transform:'scale(1) translateX(0%)',offset:1}),
      ]))

      ]),
      query(':leave',[
        animate('2000ms ease', keyframes([
        style({transform:'scale(1) ',offset:0}),
        style({transform:'scale(0.5) translateX(-25%) ',offset:0.3}),
        style({opacity:0,transform:' translateX(-50%) scale(6)',offset:1}),
        ]))
  
        ]),



      ])
      
      
    
    ]),
   
  ]);