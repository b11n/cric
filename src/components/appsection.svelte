<div class="app-section">
    <div class="heading">
        <slot name="header"><!-- optional fallback --></slot>
    </div>
    <div class="content">
        <slot name="body"><!-- optional fallback --></slot>
    </div>
</div>


<style>

    .app-section {
        margin: 16px;
    }

	.heading {
		font-family: Noto Sans, sans-serif;
		font-size: 24px;
		text-transform: uppercase;
		font-size: 16px;
		font-weight: bold;
		color: #4b4b4b;
	}

</style>