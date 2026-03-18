export class LoaderDisplayService {
    public show(element: HTMLElement) {
        element.innerHTML = `
                     <div class="loader-wrapper">
                         <span class="loader"></span>
                     </div>
                 `;
    }

    public hide(element: HTMLElement) {
        element.innerHTML = '';
    }
}
