<div class="alert">
    <div class="icon">
        <img src="/static/images/notif.png" alt="">
    </div>
    <div class="content">
        <div class="alert-heading">
            <slot name="header"><!-- optional fallback --></slot>
        </div>
        <div class="alert-content">
            <slot name="body"><!-- optional fallback --></slot>
        </div>
        <div class="alert-actions">
            <slot name="actions"><!-- optional fallback --></slot>
        </div>
    </div>

</div>


<style>
    .alert {
        font-family: 'Roboto';
        display: flex;
        padding: 8px;
        background: white;
    border-radius: 8px;
    margin: 18px 0;
    }

    .icon {
        display: flex;
        justify-content: center;
    }

    img {
        width: 64px;
        height: 64px;
        margin-top: 24px;
    }
    .alert-heading {
        font-weight: bold;
    font-size: 20px;
    color: #4a4a4a;
    margin-bottom: 4px;
    }

    .alert-actions {
        display: flex;
        justify-content: right;
    }

    .content { 
        padding: 12px 12px 0 12px;
    }
</style>