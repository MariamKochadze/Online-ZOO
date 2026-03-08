export class ErrorDisplayService {
    public showError(element: HTMLElement) {
        element.innerHTML = `
            <div class="error-toast">
                <p>Something went wrong. Please, 
                   <span class="refresh-link" onclick="location.reload()">refresh the page</span>.
                </p>
            </div>
        `;
    }
}
